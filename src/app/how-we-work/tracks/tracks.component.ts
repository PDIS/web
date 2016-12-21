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
  private counts = {};
  tags = [];

  speeches = [];
  meetings = [];
  conferences = [];
  interviews = [];
  others = [];

  constructor(
    private dataService: DataService,
    private convertService: ConvertService,
    private http: Http)
  { }

  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }
  private getIds() {
    return this.http.get("https://talk.pdis.nat.gov.tw/c/pdis-site/how-we-work-track.json")
      .map(function (data) {
        data = data.json();
        var ids = [];
        var topics = data['topic_list']['topics'];
        topics.forEach(function (topic) {
          ids.push(topic['id']);
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

          var post_tags: Array<string> = post['tags'];
          
          post_tags.forEach(element => {
            this.counts[element] = ( this.counts[element] || 0)+1;
            console.log(this.counts)
          });

          

          // for(var i in post['tags']){
          //   this.tags.push(post['tags'][i]);
          // }
          // var count={};
          // this.tags.forEach(function(x) {  this.counts[x] = ( this.counts[x] || 0)+1; });
          // this.counts.push(count);
          // console.log(count);
          this.posts.push(post);

          // sort date(yyyy/MM/dd)

          this.posts.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        })
      })

      // this.counts['x']=1;

      console.log(this.counts);
      console.log(this.tags);
      console.log(this.posts);
    });
  }

}
