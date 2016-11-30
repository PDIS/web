import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../data-service.service';
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
  item1;
  posts = [];
  posts2 = [];
  dataservice;
  tid;
  youtube1: HTMLCollectionOf<Element>;
  id: string;
  params;
  dangerousVideoUrl;
  videoUrl;
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
      var strStr = 0;
      var tmp = this.item2.post_stream.posts;
      var dom = new DOMParser(); 
      //console.log(tmp);
      for (var i in tmp) {
        var tmp2 = {};
        tmp2['content'] = tmp[i]['cooked'].split("<hr>");
        
        for(var j=0; j<2; j++){
          var  doc = dom.parseFromString(tmp2['content'][j],"text/html");
        
          this.youtube1 = doc.getElementsByClassName("lazyYT");
            
          if(this.youtube1.length != 0 ){
            //console.log(this.youtube1[0].dataset.youtubeId);
            //console.log(this.youtube1[j].dataset);
          //tmp2['content'].push(this.youtube1[0]['dataset'].youtubeId);
         // tmp2['content'][j]=this.youtube1[0]['dataset'].youtubeId;
        // this.updateVideoUrl(tmp2['content'][j]);
            this.updateVideoUrl(this.youtube1[0]['dataset'].youtubeId);
            tmp2['content'][j]="you-tube";

          }
          
        }
        console.log(tmp2['content']);
        /*
        if(this.youtube1.length != 0 ){
          console.log("youtube1.length---->"this.youtube1.length);
          this.youtube1 = doc.getElementsByClassName("lazyYT")[0].dataset.youtubeId;
          this.updateVideoUrl(this.youtube1);
          this.youtubecount+=1;
          console.log(this.youtubecount);
        }*/
        this.posts.push(tmp2);
      }
    });
  }
  updateVideoUrl(id: string) {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
 
  ngOnDestroy() { }
}
 /*
var  doc = dom.parseFromString(tmp[i]['cooked'],"text/html")
        this.youtube1 = doc.getElementsByClassName("lazyYT");
        if(this.youtube1.length != 0 ){
          console.log("youtube1.length---->"this.youtube1.length);
          this.youtube1 = doc.getElementsByClassName("lazyYT")[0].dataset.youtubeId;
          this.updateVideoUrl(this.youtube1);
          this.youtubecount+=1;
          console.log(this.youtubecount);

  var src = "is but a Dream within a dream";
  var re = /dream/;
  var pos = src.search(re);
  document.write(pos);
  document.write("<br/>");
  
  re = /dream/i;
  pos = src.search(re);
  document.write(pos);
  */

 //var strStr = tmp2['content'][1];
         // console.log( tmp2['content'][1]);
         // var strStr1 = tmp2['content'][1];
          //var ss = tmp2['content'][0].indexOf('ggggg');
          //var ss1 = strStr1.indexOf('Taiwan');
          /*if(ss !=-1 /*|| ss1 !=-1)
          {
              
              strStr++;
              console.log('Suggestion--->'+strStr);
          }*/

           // this.posts = [
  //   {"content":["what is open api","how we might ....."]},
  //   {"content":["what is open api","how we might ....."]},
  //   {"content":["what is open api"]},
  //   {"content":["what is open api","how we might ....."]}
  // ];


  /*getData(i: number) {
  
     *ngIf="item2"
        <div *ngFor="let post of item2.post_stream.posts; let i = index">
          <div *ngIf="i==1" [innerHTML]="post.cooked"></div>
        </div>
      </div>
      //console.log('https://talk.pdis.nat.gov.tw/t/' + id +'.json');
      // console.log('http://dt.iii.org.tw/t/' + id +'.json');
      // return this.http.get('https://talk.pdis.nat.gov.tw/t/17.json')
      // return this.http.get('https://talk.pdis.nat.gov.tw/t/8.json')
      // http://dt.iii.org.tw/t/17.json
      //return this.httpData.get('https://talk.pdis.nat.gov.tw/t/' + id +'.json')
      // return this.httpData.get('http://dt.iii.org.tw/t/' + id +'.json')
      // return this.httpData.get('http://192.168.99.1/t/' + id +'.json')
      // return this.httpData.get('/assets/' + id +'.json')
      ;
    }*/