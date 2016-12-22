import { TagCloudModule } from 'angular-tag-cloud-module';
import { element } from 'protractor';
import { DataService } from './../../shared/dataService/data-service.service';
import { Http } from '@angular/http';
import { ConvertService } from './../../shared/convertService/convert.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  posts = [];
  counts = {};
  tags = [];
  speeches = [];
  meetings = [];
  conferences = [];
  interviews = [];
  others = [];
  total = [];


  constructor(
    private dataService: DataService,
    private convertService: ConvertService,
    private http: Http)
  { }

  private getCategory() {
    return this.http.get("https://talk.pdis.nat.gov.tw/t/how-we-work-track/73.json?include_raw=1")
      .map(function (data) {
        data = data.json();
        var rawString = data['post_stream']['posts'][0]['raw'];
        return rawString;
      })
  }

  private getIds() {
    return this.http.get("https://talk.pdis.nat.gov.tw/c/pdis-site/how-we-work-track.json")
      .map(function (data) {
        data = data.json();
        var ids = [];
        var tags = [];
        var topics = data['topic_list']['topics'];
        topics.forEach(function (topic) {
          ids.push(topic['id']);
          tags.push(topic['tags']);
        });
        return ids.slice(1);
      })
    // .do(data => console.log(data));
  }

  private getPost(id: string) {
    return this.http.get("https://talk.pdis.nat.gov.tw/t/" + id + ".json?include_raw=1")
      .map(function (data) {
        data = data.json();
        var rawString = data['post_stream']['posts'][0]['raw'];
        return rawString;
      })
    // .do(data => console.log(data));
  }



  ngOnInit() {

    this.getIds().subscribe(ids => {
      console.log(ids);
      ids.forEach(id => {
        this.getPost(id).subscribe(post => {
          post = this.convertService.convertYAMLtoJSON(post)

          if (post['category'] == 'speech') {
            this.speeches.push(post);
            this.speeches.sort(function (a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          }
          if (post['category'] == 'meeting') {
            this.meetings.push(post);
            this.meetings.sort(function (a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          }
          if (post['category'] == 'conference') {
            this.conferences.push(post);
            this.conferences.sort(function (a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          }
          if (post['category'] == 'interview') {
            this.interviews.push(post);
            this.interviews.sort(function (a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          }
          if (post['category'] == null) {
            this.others.push(post);
            this.others.sort(function (a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          }
          this.posts.push(post);
          
          this.posts.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime(); // sort date(yyyy/MM/dd)
          });
        })
      })
      // console.log(this.tags);
      // console.log(this.counts);
    });

    this.http.get("https://talk.pdis.nat.gov.tw/tags/filter/search.json")
    .map(data => {
      data = data.json();
      var tags = [];
      var discourseTags:[Object] = data['results'];
      for( var i in discourseTags)
      {
        var tag = {};
        tag['text'] = discourseTags[i]['text'];
        tag['weight'] = discourseTags[i]['count'];
        tag['link'] = "http://localhost:4200/#/how-we-work/tracks?q="+discourseTags[i]['text'];
        tags.push(tag);
      }
      return tags;
    })
    .do(data=>{console.log(data);})
    .subscribe(
      tags => {this.tags = tags;}
    );

    this.getCategory().subscribe(category => {
      category = this.convertService.convertYAMLtoJSON(category)
      this.total.push({ category: 'All', posts: new Array<string>() });
      Object.keys(category).forEach(key => {
        this.total.push({ category: key, posts: new Array<string>() });
      })
      this.total.push({ category: 'Other', posts: new Array<string>() });

      this.getIds().subscribe(ids => {
        ids.forEach(id => {
          this.getPost(id).subscribe(post => {
            post = this.convertService.convertYAMLtoJSON(post)

            var normalized = {};
            var k = 0;

            Object.keys(category).forEach(key => {
              for (var i = 0; i < category[key].length; i++) {

                if (post['title'].indexOf(category[key][i]) > -1) {
                  k = 1;
                  normalized = ({ category: key, posts: post })
                }
                if (post['title'].indexOf(category[key][i]) == -1 && k != 1) {
                  normalized = ({ category: 'Other', posts: post })
                }
              }
            })
            this.total[0]['posts'].push(normalized);
            this.total.forEach(object => {
              if (object['category'] === normalized['category']) {
                object['posts'].push(normalized['posts']);
              }
            })


          })

        })

      })
      console.log(this.total);
    });
  }

}
