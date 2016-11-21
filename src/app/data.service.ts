import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  topic1;
  topic2;
  topic3;

  constructor(private httpData: Http, private httpList: Http) {
    this.httpData = httpData;
    this.httpList = httpList;
    // this.toggleTopic1();
  }

  getData(id: string) {
    console.log('https://talk.pdis.nat.gov.tw/t/' + id +'.json');
    // console.log('http://dt.iii.org.tw/t/' + id +'.json');
    // return this.http.get('https://talk.pdis.nat.gov.tw/t/17.json')
    // return this.http.get('https://talk.pdis.nat.gov.tw/t/8.json')
    // http://dt.iii.org.tw/t/17.json
    return this.httpData.get('https://talk.pdis.nat.gov.tw/t/' + id +'.json')
    // return this.httpData.get('http://dt.iii.org.tw/t/' + id +'.json')
    // return this.httpData.get('http://192.168.99.1/t/' + id +'.json')
    // return this.httpData.get('/assets/' + id +'.json')
    ;
  }

  getList() {
    // return this.httpList.get('https://talk.pdis.nat.gov.tw/c/rfc.json')
    // http://dt.iii.org.tw/c/pdis.json
    // https://talk.pdis.nat.gov.tw/t/how-we-work-tools/54.json
    return this.httpList.get('https://talk.pdis.nat.gov.tw/t/how-we-work-tools/54.json')
    // return this.httpList.get('/assets/pdis.json')
    ;
  }

  // toggleTopic1() {
  //   // console.log($event);
  //   this.topic1 = true;
  //   this.topic2 = false;
  //   this.topic3 = false;
  // }

  // toggleTopic2() {
  //   // console.log($event);
  //   this.topic1 = false;
  //   this.topic2 = true;
  //   this.topic3 = false;
  // }

  // toggleTopic3() {
  //   // console.log($event);
  //   this.topic1 = false;
  //   this.topic2 = false;
  //   this.topic3 = true;
  // }

}
