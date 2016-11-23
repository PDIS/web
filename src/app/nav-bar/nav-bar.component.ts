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

  constructor(
    private router: Router
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.changeLogo(event.url);
      }
    });
  }

  changeLogo(url: String) {
    console.log(url);
    switch (url) {
      case "/":
        this.imgheight = 200;
        break;
      case "/what-we-do":
        this.imgheight = 200;
        break;
      default:
        this.imgheight = -1;
    }
  }
}
