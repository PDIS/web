import { Component, OnInit, Input, AfterViewChecked, ElementRef} from '@angular/core';
import { MemberService } from '../shared/member-service/member.service'
import { Discourselink } from '../../assets/discourselink'
import 'rxjs/add/operator/concatMap';
import { Http } from '@angular/http';

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

  constructor(private MemberService: MemberService,private elementRef: ElementRef,private http:Http) { }

  ngOnInit() {
    this.MemberService.getGroup()
    .mergeMap(n => n)
    .concatMap(x => this.MemberService.getUser(x))
    .concatMap(p => this.MemberService.getInfo(p.username,p))
    .subscribe(u => this.members.push(u));
    console.log(this.members);
    /* this.MemberService.getID().subscribe(data => {
       var topics = JSON.parse(data.text()).topic_list.topics;
       topics.forEach(t => {
         this.MemberService.getProfile(t.id).subscribe(data => {
           var tags = JSON.parse(data.text()).tags;
           var new_tags = [];
           tags.forEach(p => {
             new_tags.push(p.replace("-", ""));
           });
           var content = JSON.parse(data.text()).post_stream.posts[0].cooked.split("<hr>")
           var posts = {};
           posts["name"] = content[0];
           posts["description"] = content[1];
           posts["img"] = content[2];
           posts["tags"] = new_tags;
           this.members.push(posts);
           console.log(this.members)
         })
       })
     });*/
    new WOW().init();
  }

  ngAfterViewChecked() {
   /* setTimeout( () => {
      if (this.flag == false) {
        $(this.elementRef.nativeElement).find(".ui.large.image").dimmer({on: 'hover'});
        this.flag = true;
      }
      else {}
    }, 1000);*/
    $(this.elementRef.nativeElement).find(".ui.large.image").dimmer({on: 'hover'});
  }
}
