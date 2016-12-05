import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  mappingTable = {
    "open-api": "52",
    "civic-participation": "53"
  };

  item2;
  posts = [];
  posts2 = [];
  dataservice;
  youtube1: HTMLCollectionOf<Element>;
  id: string;
  params;
  dangerousVideoUrl;
  videoUrl;
  youtubecount;
  constructor(private router: Router, private route: ActivatedRoute, private datadetail: DataService,private sanitizer: DomSanitizer) {
    this.dataservice = datadetail;
    this.params = this.route.params;
    this.route.params.subscribe(params => {
    this.id = params['id'];
    }); 
  }
 
  ngOnInit() {
    this.datadetail.getData(this.mappingTable[this.id])
    .subscribe((value) => {
      this.item2 = JSON.parse(value.text());
      var tmp = this.item2.post_stream.posts; 
      for (var i in tmp) {
        var tmp2 = {};
        tmp2['content'] = tmp[i]['cooked'].split("<hr>");
        this.youtubecount=tmp2;
        console.log(tmp2['content']);    
        this.youtube();      
        this.posts.push(this.youtubecount); 
      }
    });
  }
  youtube(){
    var dom = new DOMParser();
    for(var j=0; j<2; j++){
      var  doc = dom.parseFromString(this.youtubecount['content'][j],"text/html");    
      this.youtube1 = doc.getElementsByClassName("lazyYT");                 
      if(this.youtube1.length != 0 ){
        this.updateVideoUrl(this.youtube1[0]['dataset'].youtubeId);
        this.youtubecount['content'][j]="you-tube";        
      }               
    }
  }
  updateVideoUrl(id: string) {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  } 
  ngOnDestroy() { }
}
