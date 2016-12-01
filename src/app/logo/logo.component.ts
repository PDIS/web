import { HostListener } from '@angular/core/src/metadata/directives';
import { NavigationStart, Event } from '@angular/router/src/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

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

    if (this.logoType == "animate") {
      particlesJS.load("particles", "../../assets/particles.json", function () {
        console.log('callback - particles.js config loaded');
      });
    }
  }

  ngOnInit() {

  }
}
