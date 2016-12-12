import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

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
