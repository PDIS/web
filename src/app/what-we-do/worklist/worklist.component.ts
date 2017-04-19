import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Discourselink } from './../../../assets/discourselink';


@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.scss']
})
export class WorklistComponent {

  titles = ["empty","one"];

  constructor(private wldetail: DataService) {
  }

  ngOnInit() {    
    
    // this.wldetail.getList("pdis-site/work")
    //       .subscribe((value) => {

    //         /*** get articles from json ***/
    //         var articles = JSON.parse(value.text()).post_stream.posts;
    //         // let each article to be split and converted
    //         articles.forEach(element => {
    //           /*** split an article by <hr> ***/
    //           var article = element['cooked'].split("<hr>");
    //           // convert lazyYT into iframe
    //           article = this.lazyTY2iframe(article);
    //           // push back into posts
    //           this.posts.push(article);

    //         });
    //       });

    var lists = this.wldetail.getList("pdis-site/work");
    console.log("= lists =");
    console.log(lists);

    // push back into titles
    lists.forEach(element => {
      this.titles.push(element);
    });
  }




}

