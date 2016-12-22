import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Discourselink} from './../../discourselink';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
 
  // get_article;
  posts = [];
  page_id: string;
  // edit_youtube;

  constructor(private router: Router, private route: ActivatedRoute, private datadetail: DataService,private sanitizer: DomSanitizer,private Dlink: Discourselink) {
    this.route.params.subscribe(params => {
    this.page_id = params['id'];
    }); 
  } 

  ngOnInit() {
    this.datadetail.getData(this.page_id)
    .subscribe((value) => {

      /***get_article***/
      var articles = JSON.parse(value.text()).post_stream.posts;

      articles.forEach(element => {
        /***split an article by <hr>***/
        var article = element['cooked'].split("<hr>"); 
        article = this.lazyTY2iframe(article);
        this.posts.push(article);

      });
    });
    this.Dlink.getFoods();
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

// getComments() : Observable<Comment[]> {

//          // ...using get request
//          return this.http.get(this.commentsUrl)
//                         // ...and calling .json() on the response to return data
//                          .map((discourselink:Response) => discourselink.json())
//                          //...errors if any
//                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

//      }

}

