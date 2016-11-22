import { DataService } from './../data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-we-work',
  templateUrl: './how-we-work.component.html',
  styleUrls: ['./how-we-work.component.css']
})
export class HowWeWorkComponent implements OnInit {

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
