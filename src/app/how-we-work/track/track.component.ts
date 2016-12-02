import { DataService } from './../../shared/dataService/data-service.service';
import { Http } from '@angular/http';
import { ConvertService } from './../../shared/convertService/convert.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  posts = [];

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
    this.getIds().subscribe(ids => {
      ids.forEach(id => {
        this.getPost(id).subscribe(post=>{
          post = this.convertService.convertYAMLtoJSON(post)
          this.posts.push(post);
        })
      })
      console.log(this.posts);
    });
  }

}
