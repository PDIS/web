import { HostListener } from '@angular/core/src/metadata/directives';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isTop: boolean = true;

  lastDirection: string;
  currentDirection: string;

  showNav: boolean = true;

  currentPosition: number;

  moveStart: number;
  moveLength: number;

  bigLogo: boolean = true;

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {

    this.isTop = document.body.scrollTop < 50;

    this.currentDirection = (document.body.scrollTop > this.currentPosition) ? 'down' : 'up';

    if (this.currentDirection != this.lastDirection) {
      this.moveStart = document.body.scrollTop;
      this.moveLength = 0;
      this.lastDirection = this.currentDirection;
    }
    else {
      this.moveLength = Math.abs(this.moveStart - document.body.scrollTop);
    }

    this.currentPosition = document.body.scrollTop;

    // this.showNav = (this.moveLength>50 && this.currentDirection=='up') || this.isTop;

    // // this.bigLogo = this.currentDirection=='down' && !this.isTop || this.isTop;

    // this.bigLogo = (this.isTop && this.currentDirection=='up') || (this.currentDirection=='down' && this.bigLogo);

    if (this.currentDirection == 'down') {
      if (this.isTop) {
        this.bigLogo = true;
        this.showNav = true;
      }
      else {
        if (this.moveLength > 100) {
          this.bigLogo = false;
        }
        else if(this.moveLength > 50) {
          this.showNav = false;
        }
      }
    }
    else {
      if (this.isTop)
      {
        this.bigLogo = true;
        this.showNav = true;
      }
      else{
        if (this.moveLength > 50) {
          this.showNav = true;
          this.bigLogo = false;
        }
      }

    }

  }


  constructor() { }

  ngOnInit() {
  }

}
