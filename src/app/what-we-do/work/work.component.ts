import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Discourselink } from './../../../assets/discourselink';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  posts = [];
  post_title = "Vegeprice - 從可交付原型、不間斷溝通協調、到菜價資訊整合";

  constructor(private workdetail: DataService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.workdetail.getData("1251")
      .subscribe((value) => {

        /*** get articles from json ***/
        var articles = JSON.parse(value.text()).post_stream.posts;
        // let each article to be split and converted
        articles.forEach(element => {
          /*** split an article by <hr> ***/
          var article = element['cooked'].split("<hr>");
          // convert lazyYT into iframe
          article = this.lazyTY2iframe(article);
          // push back into posts
          this.posts.push(article);

        });
      });
  }

  lazyTY2iframe(article) {
    var dom = new DOMParser();
    var nodes: HTMLCollectionOf<Element>;
    var regexp_youtube = /<div class="lazyYT".*<\/div>/;

    for (var i = 0; i < article.length; i++) {
      var e = article[i];
      var iframe_string;
      var doc = dom.parseFromString(e, "text/html");
      nodes = doc.getElementsByClassName("lazyYT");

      for (var j = 0; j < nodes.length; j++) {
        iframe_string = "<iframe src=https://www.youtube.com/embed/" + nodes[j]['dataset'].youtubeId + " width=" + nodes[j]['dataset'].width + " height=" + nodes[j]['dataset'].height + "><\/iframe>";
      }
      /***replace <div class=lazyYT... to <iframe...***/
      e = e.replace(regexp_youtube, iframe_string);
      /***Sanitization HTML***/
      e = this.sanitizer.bypassSecurityTrustHtml(e);
      article[i] = e;
    }

    return article;
  }


}

