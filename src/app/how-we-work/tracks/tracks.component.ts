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

  test = [
   { "text": "Garena", "weight": 5 }, { "text": "蝦皮", "weight": 5 }, { "text": "特色文創", "weight": 5 }, { "text": "Speech", "weight": 8 }, { "text": "E-commerce", "weight": 5 }, { "text": "電子商務", "weight": 5 }, { "text": "數位治理", "weight": 5 }, { "text": "PDIS", "weight": 5 }, { "text": "Meeting", "weight": 5 }, { "text": "國土", "weight": 5 }, { "text": "公共治理", "weight": 5 }, { "text": "Public hearing", "weight": 5 }, { "text": "電子競技", "weight": 5 }, { "text": "電競產業", "weight": 5 }, { "text": "e-Taxi platforms", "weight": 5 }, { "text": "數位經濟", "weight": 5 }, { "text": "社群互動", "weight": 5 }, { "text": "網路直播", "weight": 5 }, { "text": "專訪", "weight": 5 }, { "text": "speech", "weight": 5 }, { "text": "開源社群", "weight": 5 }, { "text": "澎湖科技大學", "weight": 5 }, { "text": "Silicon valley", "weight": 5 }, { "text": "國發會", "weight": 5 }, { "text": "Talks", "weight": 5 }, { "text": "American Chamber", "weight": 5 }, { "text": "Cyber-attack", "weight": 5 }, { "text": "開放政府", "weight": 6 }
  ];



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
    )
  }

}
