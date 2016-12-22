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
  cate = [];


  test = [
    { "text": "Speech", "weight": 8 }, { "text": "數位治理", "weight": 5 }, { "text": "PDIS", "weight": 5 }, { "text": "Garena", "weight": 5 }, { "text": "蝦皮", "weight": 5 }, { "text": "特色文創", "weight": 5 }, { "text": "E-commerce", "weight": 5 }, { "text": "電子商務", "weight": 5 }, { "text": "Meeting", "weight": 5 }, { "text": "國土", "weight": 5 }, { "text": "公共治理", "weight": 5 }, { "text": "Public hearing", "weight": 5 }, { "text": "電子競技", "weight": 5 }, { "text": "電競產業", "weight": 5 }, { "text": "e-Taxi platforms", "weight": 5 }, { "text": "數位經濟", "weight": 5 }, { "text": "社群 互動", "weight": 5 }, { "text": "網路直播", "weight": 5 }, { "text": "專訪", "weight": 5 }, { "text": "speech", "weight": 5 }, { "text": "開源社群", "weight": 5 }, { "text": "澎湖科技大學", "weight": 5 }, { "text": "Silicon valley", "weight": 5 }, { "text": "國發會", "weight": 5 }, { "text": "開放 政府", "weight": 6 }, { "text": "Talks", "weight": 5 }, { "text": "American Chamber", "weight": 5 }, { "text": "Cyber-attack", "weight": 5 }
  ];



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
        ids = ids.slice(1);
        return ids;
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
    // this.getIds().subscribe(ids => {
    //   console.log(ids);
    //   ids.forEach(id => {
    //     this.getPost(id).subscribe(post => {
    //       post = this.convertService.convertYAMLtoJSON(post)

    //       if (post['category'] == 'speech') {
    //         this.speeches.push(post);
    //         this.speeches.sort(function (a, b) {
    //           return new Date(b.date).getTime() - new Date(a.date).getTime();
    //         });
    //       }
    //       if (post['category'] == 'meeting') {
    //         this.meetings.push(post);
    //         this.meetings.sort(function (a, b) {
    //           return new Date(b.date).getTime() - new Date(a.date).getTime();
    //         });
    //       }
    //       if (post['category'] == 'conference') {
    //         this.conferences.push(post);
    //         this.conferences.sort(function (a, b) {
    //           return new Date(b.date).getTime() - new Date(a.date).getTime();
    //         });
    //       }
    //       if (post['category'] == 'interview') {
    //         this.interviews.push(post);
    //         this.interviews.sort(function (a, b) {
    //           return new Date(b.date).getTime() - new Date(a.date).getTime();
    //         });
    //       }
    //       if (post['category'] == null) {
    //         this.others.push(post);
    //         this.others.sort(function (a, b) {
    //           return new Date(b.date).getTime() - new Date(a.date).getTime();
    //         });
    //       }
    //       var post_tags: Array<string> = post['tags'];
    //       post_tags.forEach(element => {
    //         this.counts[element] = (this.counts[element] || 0) + 1;
    //       });
    //       var normalized = [] as { text: string, weight: number }[];
    //       Object.keys(this.counts).forEach(tag => {
    //         normalized.push({ text: tag, weight: this.counts[tag] + 4 });

    //       });
    //       this.tags = normalized;
    //       this.posts.push(post);
    //       // console.log(this.tags);

    //       this.posts.sort(function (a, b) {
    //         return new Date(b.date).getTime() - new Date(a.date).getTime(); // sort date(yyyy/MM/dd)
    //       });
    //     })
    //   })
    //   // console.log(this.tags);
    //   // console.log(this.counts);
    //   console.log(this.posts);
    // });

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
