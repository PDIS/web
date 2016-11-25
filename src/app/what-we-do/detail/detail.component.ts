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

  id: string;
  params;

  constructor(private router: Router, private route: ActivatedRoute, private datadetail: DataService) {
    //this.tid = '52';
    this.dataservice = datadetail;
    this.params = this.route.params;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
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


  ngOnInit() {
    this.datadetail.getData(this.mappingTable[this.id])
      .subscribe((value) => {
        this.item2 = JSON.parse(value.text());
        console.log(this.item2);

        var tmp = this.item2.post_stream.posts;
        var count1 = 0;
        for (var i in tmp) {
          var tmp2 = {};
          tmp2['content'] = tmp[i]['cooked'].split("<hr>");
          this.posts.push(tmp2);
        }
      });
  }

  ngOnDestroy() {

  }

}
