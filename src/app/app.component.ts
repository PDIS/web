import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

cdr;
  list;
topic;
  // @Input()
  // topic1;
  // @Input()
  // topic2;
  // @Input()
  // topic3;

  // @Input()
  // itemFoot;

  // @Output()
  // click = new EventEmitter<any>();
// private httpData: Http, private http: Http,
  constructor(private http: Http, private datasvc: DataService, cdr: ChangeDetectorRef) {
    // RxJS
    // this.httpData = httpData;
    // this.http = http;
    // http.get('/assets/articles.json')
    //     .subscribe((value) => {
    //       this.data = value.json();
    //     });

    this.topic = "1";

    datasvc.getList()
    .subscribe((value) => {
      // this.data = value.json();
      // this.data = JSON.stringify(value)
      // this.data = JSON.parse(value.text()),
      // console.log(this.data[0]),
      // this.item = this.data[0]
      this.list = JSON.parse(value.text()),
      console.log(this.list),
      console.log('getList')
      ;
    });
this.cdr = cdr;
// datasvc.toggleTopic1();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  setTitle($event: MouseEvent, id: string) {

    console.log($event);
    // if ($event.ctrlKey) {
    this.http.get('https://talk.pdis.nat.gov.tw/t/' + id +'.json')
    // this.http.get('/assets/' + id +'.json')
        .subscribe((value) => {
          // this.item = value.json(),
          console.log(value.json())
          // this.itemFoot = value.json()
          ;
        });
    // }
    // this.click.emit(this.item);

  }

  setTitle2($event: MouseEvent, idx: number) {

    console.log($event);
    console.log(idx);
    // +i because slice:1
    console.log(this.list['topic_list'].topics[idx + 1]);
    // this.item = this.list['topic_list'].topics[idx + 1];
    // this.itemFoot = this.list['topic_list'].topics[idx + 1];

  }


}
