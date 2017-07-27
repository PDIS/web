import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DataService } from './../../shared/dataService/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Discourselink } from './../../../assets/discourselink';


@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.scss']
})
export class WorklistComponent {

  topics = []

  constructor(private data: DataService) {
  }

  ngOnInit() {

    /* get the list of topics in some category */
    this.data.getList("pdis-site/work")
      .subscribe(topics => {
        // console.log(topics)
        topics.map(topic => {
          topic.image_url = this.data.base + topic.image_url
          return topic
        })
        this.topics = topics
      })
  }

}

