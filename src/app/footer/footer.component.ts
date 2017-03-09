import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private http: Http) { }

  rss = {}

  ngOnInit() {
    /* let each listed external link append with an icon */
    let list = Array.from(document.querySelectorAll("li a[target='_blank']"))
    for(let e of list) {
      let icon = document.createElement("i")
      icon.className = "fa fa-external-link"
      icon.style.paddingLeft = "1ex"
      icon.style.fontSize = "50%"
      e.appendChild(icon)
    }

    /* api for rss */
    let query = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.google.com.tw%2Falerts%2Ffeeds%2F11419317490390774846%2F8364829402486342759'
    this.http
        .get(query)
        .map(res => res.json())
        .subscribe(data => this.rss = data)
  }

}
