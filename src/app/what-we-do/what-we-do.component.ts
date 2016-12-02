import { DataService } from '../shared/dataService/data-service.service';
import { DiscourseService } from '../shared/discourseService/discourse.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})
export class WhatWeDoComponent implements OnInit {

  item1;
  item2;
  tid;
  cid;
  res;
  think;

  constructor(private datasvcWwd: DataService, private discoursesvcWwd: DiscourseService) {

    console.log('item1');
    this.tid = '52';
    datasvcWwd.getData(this.tid)
      .subscribe((value) => {
        // this.data = value.json();
        this.item1 = JSON.parse(value.text()),
          console.log(this.item1)
          ,
          console.log(this.tid);
      });
    this.tid = '53';
    datasvcWwd.getData(this.tid)
      .subscribe((value) => {
        // this.data = value.json();
        this.item2 = JSON.parse(value.text()),
          console.log(this.item2)
          ,
          console.log(this.tid);
      });

  }

  ngOnInit() {

  }

  postDataToServer(raw: string) {
    this.tid = '67';
    this.cid = '12';
    this.discoursesvcWwd.postDiscoursePostRestful(raw, this.cid, this.tid)
      .subscribe(
      data => this.res = data,
      () => console.log('POST Complete')
      );
  }

}
