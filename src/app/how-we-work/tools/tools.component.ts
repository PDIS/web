import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    tools_list;
    tools_detail_list;

    constructor(private datasvcHww: DataService) {
    }

    ngOnInit() {
        // how-we-work-tools = 54
        this.datasvcHww.getData("54").subscribe((value) => {
            this.tools_list = JSON.parse(value.text()),
            console.log(this.tools_list);
        });

        // how-we-work-tools-detail-version = 208
        this.datasvcHww.getData("208").subscribe((value) => {
            this.tools_detail_list = JSON.parse(value.text()),
            console.log(this.tools_detail_list);
        });

    }

}
