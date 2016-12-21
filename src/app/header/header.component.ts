import {Renderer} from '@angular/core/src/render/api';
import {ViewChild} from '@angular/core/src/metadata/di';
import { NavigationStart } from '@angular/router/src/router';
import { Router } from '@angular/router/src/router';
import 'rxjs/add/operator/pairwise';
import { HostListener } from '@angular/core/src/metadata/directives';
import { Component, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {



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

        var scrollY = window.scrollY;

        this.isTop = scrollY < 50;

        this.currentDirection = (scrollY > this.currentPosition) ? 'down' : 'up';

        if (this.currentDirection != this.lastDirection) {
            this.moveStart = scrollY;
            this.moveLength = 0;
            this.lastDirection = this.currentDirection;
        }
        else {
            this.moveLength = Math.abs(this.moveStart - scrollY);
        }

        this.currentPosition = scrollY;

        if (this.currentDirection == 'down') {
            if (this.isTop) {
                this.bigLogo = true;
                this.showNav = true;
            }
            else {
                if (this.moveLength > 100) {
                    this.bigLogo = false;
                }
                else if (this.moveLength > 50) {
                    this.showNav = false;
                }
            }
        }
        else {
            if (this.isTop) {
                this.bigLogo = true;
                this.showNav = true;
            }
            else {
                if (this.moveLength > 50) {
                    this.showNav = true;
                    this.bigLogo = false;
                }
            }

        }

    }

    @ViewChild('mobileBtn') el:ElementRef;
    @ViewChild('navbar') navbar:ElementRef;
    constructor(private router: Router, private rd: Renderer) {

        this.router.events.pairwise().subscribe((e) => {
            if (e[1] instanceof NavigationStart && this.navbar.nativeElement.classList.contains("in")) {
                this.rd.invokeElementMethod(this.el.nativeElement,'click');
            }
        });

    }

}
