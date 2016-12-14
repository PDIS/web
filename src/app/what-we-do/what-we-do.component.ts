import { Http } from '@angular/http';
import { DataService } from './../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  constructor(private dataService: DataService, private http:Http) { }

  private topics = [];

  private getIds() {
    return this.http.get("https://talk.pdis.nat.gov.tw/c/pdis-site/what-we-do.json")
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

  private getPostCooked(id: string) {
    return this.http.get("https://talk.pdis.nat.gov.tw/t/" + id + ".json")
      .map(function (data) {
        data = data.json();
        return data['post_stream']['posts'][0]['cooked'];
      })
      // .do(data => console.log(data));
  }

  ngOnInit() {
    this.getIds()
    .subscribe(ids => {
      ids.forEach(id => {
        this.getPostCooked(id)
        .do(data => console.log(data))
        .subscribe(postCooked=>{
          this.topics.push(postCooked);
        })
      })
    });
  }

}
