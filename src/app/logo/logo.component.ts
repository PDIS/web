import { HostListener } from '@angular/core/src/metadata/directives';
import { NavigationStart, Event } from '@angular/router/src/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {

  private logoType: String;

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
        this.logoType = "animate";
        break;
      case "/what-we-do":
        this.logoType = "animate";
        break;
      case "/how-we-work":
        this.logoType = "black";
        break;
      default:
        this.logoType = "white";
        break;
    }
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    console.log("Scroll Event", document.body.scrollTop);
    console.log(event);
  }

}
