import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    private tools_list;
    private tools_detail_list = [];

    constructor(private datasvcHww: DataService) {
    }

    ngOnInit() {
        // how-we-work-tools = 54
        this.datasvcHww.getData("54").subscribe(value => {
            this.tools_list = JSON.parse(value.text());
            // console.log(this.tools_list);
        });

        // how-we-work-tools-detail-version = 208
        this.datasvcHww.getData("208").subscribe(value => {
            var jsdata = JSON.parse(value.text());
            jsdata['post_stream']['posts'].forEach(data =>{ // function(data){
                var post = {};
                post['title'] = data['cooked'];
                post['img'] = data['cooked'];
                post['text'] = data['cooked'];
                console.log($(data['cooked']).text());
                this.tools_detail_list.push(post);
            });
            // this.tools_detail_list['post_stream']['posts'][0]['cooked']

            // console.log(this.tools_detail_list);
        });

    }

}
