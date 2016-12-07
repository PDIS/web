import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DiscourseService {
  private _discourseUrl: string = "https://talk.pdis.nat.gov.tw/posts?api_key=cd1a0c22c71b51dec2b702fbb646df99899c27e32c106a1c3173e1ac5336308c&api_username=targee.gmail";

  constructor(private _http: Http) { }

  serialize(obj) {
    // return Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&')
    return Object.keys(obj).map(k => k + '=' + encodeURIComponent(obj[k])).join('&')
  }

  postDiscourseTopicRestful(title: string, raw: string, category: string) {
    let body = this.serialize(JSON.parse(JSON.stringify({ "title": title, "raw": raw, "category": category, "archetype": "regular", "reply_to_post_number": "0" })));
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this._discourseUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postDiscoursePostRestful(raw: string, category: string, topic_id: string) {
    let body = this.serialize(JSON.parse(JSON.stringify({ "raw": raw, "archetype": "regular", "category": category, "topic_id": topic_id })));
    // console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this._discourseUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // https://meta.discourse.org/t/private-message-send-api/27593/2
  postDiscourseMessageRestful(title: string, raw: string, target_usernames: string) {
    let body = this.serialize(JSON.parse(JSON.stringify({ "title": title, "raw": raw, "archetype": "private_message", "target_usernames": target_usernames })));
    // console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this._discourseUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // {"action":"create_post","errors":["內容 與你最近發表的內容太相似"]}
  // {"action":"create_post","errors":["我們非常抱歉，新用戶被臨時限制在同一個主題上，只能回覆 3 次","內容 與你最近發表的內容太相似"]}
  // {"action":"create_post","errors":["內容 長度不足 (下限是 10 字)","內容 無效，請再仔細描述","我們非常抱歉，新用戶被臨時限制在同一個主題上，只能回覆 3 次"]}
  private extractData(res: Response) {
    console.log(res.status);
    // let body = res.json();
    let body = JSON.parse(res.text());
    console.log(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    let crlf: string;

    errMsg = '';
    // crlf = '\n';
    crlf = '<br>';
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      for (let x of JSON.parse(err).errors) {
        errMsg += x + crlf;
      }
      if (errMsg.length > 0) {
        errMsg = errMsg.substr(0, errMsg.length - crlf.length);
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(error.status + '-' + error.statusText);
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}