import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';

declare var particlesJS: any;
// declare var angular: any;
// declare var $;

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    private tools_list;
    private tools_detail_list = [];

    constructor(private datasvcHww: DataService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        // ******************** particlesJS
        particlesJS.load("particles", "../../assets/particles.json", function () {
            console.log('callback - particles.js config loaded');
        });

        // how-we-work-tools = 54
        // fetch the title & thumb of tools
        this.datasvcHww.getData("54").subscribe(value => {
            // console.log(this.tools_list);
            this.tools_list = JSON.parse(value.text());
        });

        // how-we-work-tools-detail-version = 208
        this.datasvcHww.getData("208").subscribe(value => {
            let jsdata = JSON.parse(value.text());
            // parsing raw html into param
            jsdata['post_stream']['posts'].forEach(data =>{
                let post = {};
                let ytdata;
                let dom = (new DOMParser()).parseFromString(data["cooked"], "text/html");
                // var dom = angular.element(data["cooked"]);
                // var dom = $(data["cooked"]);
                // post['title'] = dom.find("h4").text();
                // post['text'] = dom.find("p").html();
                // post['img'] = dom.find("img").attr("src");
                post['title'] = dom.querySelector("h4").innerText;
                post['img'] = dom.querySelector("img") && dom.querySelector("img").src || "/assets/img/placeholder-1000x518.png";
                post['text'] = dom.querySelector("p").innerHTML;
                post['link'] = dom.querySelector("aside header a") && (<HTMLElement>dom.querySelector("aside header a")).outerHTML;
                
                // if lazyYT exist, then return its converted iframe
                post['yt'] = dom.querySelector(".lazyYT") && (
                    ytdata = (<HTMLElement>dom.querySelector(".lazyYT")).dataset
                ) && (
                    /*** sanitized from xss ***/
                    this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + ytdata["youtubeId"])
                );

                this.tools_detail_list.push(post);
            });
            // this.tools_detail_list['post_stream']['posts'][0]['cooked']

            // console.log(this.tools_detail_list);
        });

    }

}
