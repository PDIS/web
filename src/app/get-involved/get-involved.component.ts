import { Component, OnInit } from '@angular/core';
import { DiscourseService } from '../shared/discourseService/discourse.service';

@Component({
  selector: 'app-get-involved',
  templateUrl: './get-involved.component.html',
  styleUrls: ['./get-involved.component.css']
})
export class GetInvolvedComponent implements OnInit {

  tid;
  cid;
  think;
  res;
  err;


  constructor(private discoursesvcWwd: DiscourseService) { }

  ngOnInit() {
  }

  postDataToServer(raw: string) {
    this.tid = '67';
    this.cid = '12';
    this.res = '';
    this.err = '';
    this.discoursesvcWwd.postDiscoursePostRestful(raw, this.cid, this.tid)
      .subscribe(
      data => this.res = data,
      err => {
        this.err = err,
          console.log(err)
          // ,alert(err)
      },
      () => console.log('POST Complete')
      );
  }

}
