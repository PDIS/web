import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpModule }      from '@angular/http';

@Injectable()
export class Discourselink { 


    private foods: Object
 
    constructor(private http: Http) { }
    
    getFoods() {
    this.http.get('/app/discourselink.json')
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.foods = data},
        err => console.error(err),
        () => console.log()
      );
  }
}

