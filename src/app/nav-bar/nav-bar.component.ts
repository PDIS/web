import { Event, NavigationStart } from '@angular/router/src/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  private imgheight;
  private navClass;
  private isCollapse;

  constructor(
    private router: Router
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.changeLogo(event.url);
        this.isCollapse = false;
        console.log(this.isCollapse);
      }
    });
  }

  changeLogo(url: String) {
    switch (url) {
      case "/":
        this.imgheight = (window.innerHeight/2)-40;
        break;
      case "/what-we-do":
        this.imgheight = (window.innerHeight/2)-40;
        break;
      default:
        this.imgheight = -1;
    }
    if(this.imgheight>0)
    {
      this.navClass = "navbar navbar-default navbar-clear affix-top";
    }
    else
    {
      this.navClass = "navbar navbar-fixed-top navbar-clear";
    }
  }
}
