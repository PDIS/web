import { Component, OnInit, Input, AfterViewChecked, ElementRef} from '@angular/core';
import { MemberService } from '../shared/member-service/member.service'
import { Discourselink } from '../../assets/discourselink'
import { Http } from '@angular/http';
// import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/finally';

declare var WOW: any;
declare var $: any;


@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss'],
})

export class WhoWeAreComponent implements OnInit  {
  members = [];
  order: string = "id";
  flag:boolean = false;
  i: number = 0

  constructor(private MemberService: MemberService,private elementRef: ElementRef,private http:Http) { }

  ngOnInit() {
    this.MemberService.getGroup()
    .mergeMap(n => n)
    .concatMap(x => this.MemberService.getUser(x))
    .concatMap(p => this.MemberService.getInfo(p.username,p))
    .do(u => this.members.push(u))
    .finally(() => {
      console.log('done')
      // $(this.elementRef.nativeElement).find(".ui.large.image").dimmer({on: 'hover'})
      // $(".ui.large.image").dimmer({on: 'hover'})
      setTimeout(() => $(".ui.large.image").dimmer({on: 'hover'}), 100)
    })
    .subscribe(() => {
      console.log('push')
    })

    new WOW().init();

  }
}
