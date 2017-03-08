import { Http } from '@angular/http';
import { DataService } from './../shared/dataService/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Discourselink } from './../../assets/discourselink';
// declare var particlesJS: any;
declare var WOW: any;
declare var Swiper: any;
declare var $: any;

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  constructor(private dataService: DataService, private http: Http) { }

  private topics = [];

  private getIds() {
    return this.http.get(Discourselink.Host+Discourselink.Category+Discourselink.Whatwedo+Discourselink.Filename)
      .map(function (data) {
        data = data.json();
        var ids = [];
        var topics = data['topic_list']['topics'];
        topics.forEach(function (topic) {
          ids.push(topic['id']);
        });
        return ids;
      })
    // .do(data => console.log(data));
  }

  private getPost(id: string) {
    return this.http.get(Discourselink.Host+Discourselink.Text + id + Discourselink.Filename)
      .map(function (data) {
        data = data.json();
        var post = {};
        var post_content = data['post_stream']['posts'][0]['cooked'].split("<hr>");
        post['id'] = id;
        post['title'] = post_content[0].replace(/<(?:.|\n)*?>/gm, '');
        post['text'] = post_content[1];
        post['image'] = post_content[2];
        return post;
      })
    // .do(data => console.log(data));
  }

  /* an event handler to go #anchor scroll position */
  goAnchor(anchor){
    if(anchor == "top"){
      /* go to top */
      $('html, body').animate({
        scrollTop: 0,
      }, 1000)
    }
    else if(anchor){
      /* get the top position of anchor */
      let anchor_y = $(anchor).offset().top
      /* go to anchor (animation to do) */
      $('html, body').animate({
        scrollTop: anchor_y,
      }, 1000)
    }
    return false
  }

  ngOnInit() {
    this.getIds()
      .subscribe(ids => {
        ids.forEach(id => {
          this.getPost(id)
            // .do(data => console.log(data))
            .subscribe(post => {
              this.topics.push(post);
            })
        })
      });

    /* WOW for animateCSS */
    new WOW().init();

    /* particlesJS */
    // particlesJS.load("particles", "../../assets/particles.json", function () {
    //     console.log('callback - particles.js config loaded');
    // });

    new Swiper('.swiper-container', {
      // Optional parameters
      autoplay: 10000, /* 10 sec to change */
      keyboardControl: true,
      direction: 'horizontal',
      loop: true,
      spaceBetween: 30,
      grabCursor: true,
      pagination: '.swiper-pagination',
      //paginationType: 'fraction'
    })
  }

}
