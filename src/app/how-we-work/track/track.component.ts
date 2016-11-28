import { DataService } from './../../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

item2;

posts = [];

tid;

  constructor(private router:Router, private route: ActivatedRoute, private datadetail: DataService) { 
    this.tid = '76';
    
  }

  id: String;
  params;
  ngOnInit() {
    // this.params = this.route.params;
    // this.route.params.subscribe(params =>{
    //   this.id = params['id'];
    // });
    
    console.log(this.datadetail.getData2("pdis-site/how-we-work-track"));
  }

}
