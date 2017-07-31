import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private http: Http) {
    this.http = http;
  }

  base = 'https://talk.pdis.nat.gov.tw'

  getData(id: string) {
    // console.log('https://talk.pdis.nat.gov.tw/t/' + id + '.json');
    return this.http.get('https://talk.pdis.nat.gov.tw/t/' + id + '.json');
  }

  getList(category: string) {
    // var topics = [];
    // var titles = [];
    // console.log('https://talk.pdis.nat.gov.tw/c/' + category + '.json');

    // topics
    return this.http
      .get('https://talk.pdis.nat.gov.tw/c/' + category + '.json')
      .map((value) => {
        let topics = JSON.parse(value.text()).topic_list.topics
        return topics
      })
  }

}
