import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Discourselink } from './../../discourselink';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
 
  posts = [];
  page_id: string;

  constructor(private router: Router, private route: ActivatedRoute, private datadetail: DataService,private sanitizer: DomSanitizer) {

    this.route.params.subscribe(params => {
    this.page_id = params['id'];
    }); 
  } 

  ngOnInit() {
    this.datadetail.getData(this.page_id)
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

  lazyTY2iframe(article){
    var dom = new DOMParser();
    var nodes: HTMLCollectionOf<Element>;
    var regexp_youtube= /<div class="lazyYT".*<\/div>/;

    for (var i = 0; i < article.length; i++) {
      var e = article[i];
      var iframe_string;
      var doc = dom.parseFromString(e, "text/html");
      nodes = doc.getElementsByClassName("lazyYT");

      for (var j = 0; j < nodes.length; j++) {
        iframe_string = "<iframe src=https://www.youtube.com/embed/"+nodes[j]['dataset'].youtubeId+" width="+nodes[j]['dataset'].width+" height="+nodes[j]['dataset'].height+"><\/iframe>";          
      }
      /***replace <div class=lazyYT... to <iframe...***/  
      e = e.replace(regexp_youtube,iframe_string);  
      /***Sanitization HTML***/
      e = this.sanitizer.bypassSecurityTrustHtml(e);  
      article[i] = e;
    }
        
    return article;
  }  

  ngOnDestroy() { }
}

