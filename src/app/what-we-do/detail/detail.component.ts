import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
 
  get_article;
  posts = [];
  page_id: string;
  edit_youtube;
  constructor(private router: Router, private route: ActivatedRoute, private datadetail: DataService,private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
    this.page_id = params['id'];
    }); 
  } 
  ngOnInit() {
    this.datadetail.getData(this.page_id)
    .subscribe((value) => {
      this.get_article = JSON.parse(value.text()); /***get_article***/
      var article = this.get_article.post_stream.posts; 
      for (var i in article) {
        var article_sort = {};
        article_sort['content'] = article[i]['cooked'].split("<hr>"); /***split <hr>***/
        this.edit_youtube=article_sort;           
        this.youtube();         
        this.posts.push(this.edit_youtube); /***Send to the web page***/
      }     
    });
  }
  youtube(){
    var dom = new DOMParser();
    var search_youtube: HTMLCollectionOf<Element>;
    var regular_Expression_youtube= /<[a-z]{3}\s[a-z]{5}="\w{6}"\s[a-z \-]{15}.*<\/[a-z]{3}>/;
    for(var i=0; i<2; i++){
      var  doc = dom.parseFromString(this.edit_youtube['content'][i],"text/html");   //***Convert String format to HTML***/
      search_youtube = doc.getElementsByClassName("lazyYT");                     
      if(search_youtube.length != 0 ){
        for(var k =0; k< search_youtube.length;k++){
          var iframe_youtube="<iframe src=https://www.youtube.com/embed/"+search_youtube[k]['dataset'].youtubeId+"><\/iframe>";          
          this.edit_youtube['content'][i]=this.edit_youtube['content'][i].replace(regular_Expression_youtube,iframe_youtube);  /***replace <div class=lazyYT... to <iframe...***/
        }      
      this.edit_youtube['content'][i]=this.sanitizer.bypassSecurityTrustHtml(this.edit_youtube['content'][i]); /***Sanitization HTML***/
      }               
    }
  }  
  ngOnDestroy() { }
}

