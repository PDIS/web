import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DiscourseService } from '../shared/discourseService/discourse.service';
import { DataService } from '../shared/dataService/data-service.service';
=======
>>>>>>> 7ef14c87d7a0d7ff7cb5a4bdc4afe74910383862

@Component({
  selector: 'app-get-involved',
  templateUrl: './get-involved.component.html',
  styleUrls: ['./get-involved.component.scss']
})
export class GetInvolvedComponent implements OnInit {

<<<<<<< HEAD
  tid;
  cid;
  think;
  res;
  err;

  constructor(private discoursesvcWwd: DiscourseService, private datasvcGi: DataService) { }
=======
  constructor() { }
>>>>>>> 7ef14c87d7a0d7ff7cb5a4bdc4afe74910383862

  ngOnInit() {
  }

<<<<<<< HEAD
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
      },
      () => console.log('POST Complete')
      );
  }

=======
>>>>>>> 7ef14c87d7a0d7ff7cb5a4bdc4afe74910383862
}
