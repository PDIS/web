import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';

// declare var angular: any;
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
        // fetch the title & thumb of tools
        this.datasvcHww.getData("54").subscribe(value => {
            // console.log(this.tools_list);
            this.tools_list = JSON.parse(value.text());
        });

        // how-we-work-tools-detail-version = 208
        this.datasvcHww.getData("208").subscribe(value => {
            var jsdata = JSON.parse(value.text());
            // parsing raw html into param
            jsdata['post_stream']['posts'].forEach(data =>{
                var post = {};
                // var dom = angular.element(data["cooked"]);
                // var dom = $(data["cooked"]);
                // post['title'] = dom.find("h4").text();
                // post['text'] = dom.find("p").html();
                // post['img'] = dom.find("img").attr("src");
                var dom = (new DOMParser()).parseFromString(data["cooked"], "text/html");
                post['title'] = dom.querySelector("h4").innerText;
                post['text'] = dom.querySelector("p").innerHTML;
                post['img'] = dom.querySelector("img") && dom.querySelector("img").src || "/assets/img/placeholder-1000x518.png";
                post['link'] = dom.querySelector("aside header a") && (<HTMLElement>dom.querySelector("aside header a")).outerHTML;
                console.log(dom);
                this.tools_detail_list.push(post);
            });
            // this.tools_detail_list['post_stream']['posts'][0]['cooked']

            // console.log(this.tools_detail_list);
        });

    }

}
