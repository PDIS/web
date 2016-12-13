import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  list;

  constructor(private datasvcHww: DataService) {
  }

  ngOnInit() {
    this.datasvcHww.getList()
      .subscribe((value) => {
        this.list = JSON.parse(value.text()),
          console.log(this.list);
      });
  }

}
