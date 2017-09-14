import { DataService } from './../../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';

// declare var particlesJS: any;
// declare var $;
declare var WOW: any;

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

    tools_list;
    tools_detail_list = [];

    constructor(private datasvcHww: DataService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        /* WOW for animateCSS */
        new WOW().init();

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
                let dom = (new DOMParser()).parseFromString(data["cooked"], "text/html");

                post['title'] = (<HTMLElement>dom.querySelector("h1,h2,h3,h4,h5,h6")).innerText;

                let imgs = dom.querySelectorAll("img");
                console.log(imgs)
                post['img'] = imgs.length && (
                    imgs[imgs.length - 1].src || imgs[imgs.length - 1].getAttribute("src")
                ) || "http://via.placeholder.com/350x350";

                post['text'] = dom.querySelector("p").innerHTML;

                post['link'] = dom.querySelector("aside header a") && (<HTMLElement>dom.querySelector("aside header a")).outerHTML;

                let ytdata;
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
