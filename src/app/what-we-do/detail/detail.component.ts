import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute) {

  }

  id: String;

  params;

  ngOnInit() {
    this.params = this.route.params;
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    });
  }

  ngOnDestroy() {

  }

}
