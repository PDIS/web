import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private httpData: Http/*, private httpList: Http*/) {
    this.httpData = httpData;
    // this.httpList = httpList;
  }

  getData(id: string) {
    console.log('https://talk.pdis.nat.gov.tw/t/' + id + '.json');
    return this.httpData.get('https://talk.pdis.nat.gov.tw/t/' + id + '.json');
  }

  // getList() {
  //   return this.httpList.get('https://talk.pdis.nat.gov.tw/t/how-we-work-tools/54.json');
  // }
  // ***************** isn't this the same as getData() ?

  getList(category: string) {
    var topics = [];
    var titles = [];
    console.log('https://talk.pdis.nat.gov.tw/c/' + category + '.json');
    
    // topics
    this.httpData.get('https://talk.pdis.nat.gov.tw/c/' + category + '.json').subscribe((value) => {
      topics = JSON.parse(value.text()).topic_list.topics;
      
      for (var i in topics) {
        console.log("i: " + i);
        console.log(topics[i].title);
        titles.push(topics[i].title);
      //   // console.log(topics[i].post_stream.posts);
      //   // this.getData(topics[i]).subscribe((value) => { titles.push(value.text()) });
      }
    });;
    return titles;
  }

}
