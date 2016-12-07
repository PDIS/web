import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private httpData: Http, private httpList: Http) {
    this.httpData = httpData;
    this.httpList = httpList;
  }

  getData(id: string) {
    console.log('https://talk.pdis.nat.gov.tw/t/' + id + '.json');
    return this.httpData.get('https://talk.pdis.nat.gov.tw/t/' + id + '.json');
  }

  getList() {
    return this.httpList.get('https://talk.pdis.nat.gov.tw/t/how-we-work-tools/54.json');
  }

  getData2(category: string) {
    var topics: Observable<any>;
    var posts = [];
    console.log('https://talk.pdis.nat.gov.tw/c/' + category + '.json');
    topics
    this.httpData.get('https://talk.pdis.nat.gov.tw/c/' + category + '.json').subscribe((value) => {
      topics = JSON.parse(value.text());

      console.log(topics['topic_list']['topics']);
      for (var i in topics['topic_list']['topics']) {
        this.getData(topics[i]).subscribe((value) => { posts.push(value.text()) });
      }
    });;

    console.log(posts);

    return posts;
  }

}
