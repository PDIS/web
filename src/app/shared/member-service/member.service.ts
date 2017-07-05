import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Discourselink } from '../../../assets/discourselink'

@Injectable()
export class MemberService {
  groupUrl: string;
  UserUrl: string;
  InfoUrl: string;
/*  WhoweareUrl: string
  profileUrl: string;*/
  constructor(private http: Http) {
    this.groupUrl = Discourselink.GroupUrl;
    this.UserUrl = Discourselink.UserUrl;
    this.InfoUrl = Discourselink.InfoUrl;
   /* this.WhoweareUrl = Discourselink.WhoweareUrl;
    this.profileUrl = Discourselink.ProfileUrl;*/
   }

   getGroup(): Observable<any> {
     return this.http.get(this.groupUrl).map(g => 
      g.json().members.map(u => u.username)
     );
   }

   getUser(name: any): Observable<any> {
     return this.http.get(this.UserUrl + name + ".json").map( u => {
       var people = {};
       var tmp2 = u.json().user;
       people['id'] = tmp2.id;
       people['name'] = tmp2.name;
       people['username'] = tmp2.username;
       people['image'] = Discourselink.Host + tmp2.avatar_template.replace("{size}", "800");
       people['wiselikelink'] = "https://wiselike.tw/#/user/" + tmp2.username;
       return people;
     });
   }

   getInfo(name: any,user: any): Observable<any> {
     return this.http.get(this.InfoUrl + name.toString().toLowerCase() + ".json").map ( u => {
       var topic = u.json().topic_list.topics[0];
       var content = topic.excerpt.replace(" :new:", "");
       var new_tags = [];
       var tags = topic.tags;
       tags.map(p => {
         new_tags.push(p.replace("wiselike-", ""));
       });
       user['tags'] = new_tags;
       if (content.includes("建立一個完整的")) {
         user['description'] = "";
       }
       else {
         user['description'] = content;
       }
       return user;
     });
   }

  /* getID(): Observable<any> {
     return this.http.get(this.WhoweareUrl);
   }

   getProfile(id: string): Observable<any> {
     return this.http.get(this.profileUrl + id + ".json");
   }*/
}
