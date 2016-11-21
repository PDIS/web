import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-howwework',
  templateUrl: './howwework.component.html',
  styleUrls: ['./howwework.component.css']
})
export class HowweworkComponent implements OnInit {

  list;

  constructor(private datasvcHww: DataService) {
    datasvcHww.getList()
    .subscribe((value) => {
      // this.data = value.json();
      this.list = JSON.parse(value.text()),
      console.log(this.list);
    });
  }

  ngOnInit() {
  }

}
