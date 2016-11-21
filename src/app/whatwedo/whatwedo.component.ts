import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-whatwedo',
  templateUrl: './whatwedo.component.html',
  styleUrls: ['./whatwedo.component.css']
})
export class WhatwedoComponent implements OnInit {

  item1;
  item2;
  tid;

  constructor(private datasvcWwd: DataService) {

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

}
