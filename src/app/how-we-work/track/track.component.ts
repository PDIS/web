import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  posts;


  
  constructor() {

    

  }

  ngOnInit() {

    this.posts = [
      {
        "title": "澎湖科技大學演講及問答",
        "date": "2016-11-22",
        "tags": [
          "澎湖科技大學",
          "開源社群",
          "speech",
          "video"
        ],
        "participants": "Audery Tang",
        "content": {
          "youtube": "https://www.youtube.com/watch?v=Gz93tS7rCXg",
          "transcript": "",
          "soundcloud": ""
        }
      },
      {
        "title": "新加坡代表處及Garena來訪",
        "date": "2016-11-03",
        "tags": [
          "Garena",
          "蝦皮",
          "特色文創",
          "transcript"
        ],
        "participants": "Audery Tang",
        "content": {
          "youtube": "",
          "transcript": "http://sayit.archive.tw/2016-11-03-%E6%96%B0%E5%8A%A0%E5%9D%A1%E4%BB%A3%E8%A1%A8%E8%99%95%E5%8F%8Agarena%E4%BE%86%E8%A8%AA",
          "soundcloud": ""
        }
      },
      {
        "title": "「電子競技未來產業方向與歸類」公聽會",
        "date": "2016-10-14",
        "tags": [
          "電子競技",
          "電競產業",
          "transcript"
        ],
        "participants": "Audery Tang",
        "content": {
          "youtube": "",
          "transcript": "http://sayit.archive.tw/2016-10-14-%E9%9B%BB%E5%AD%90%E7%AB%B6%E6%8A%80%E6%9C%AA%E4%BE%86%E7%94%A2%E6%A5%AD%E6%96%B9%E5%90%91%E8%88%87%E6%AD%B8%E9%A1%9E%E5%85%AC%E8%81%BD%E6%9C%83",
          "soundcloud": ""
        }

      },
      {
        "title": "國土及公共治理季刊第16期-政策對談",
        "date": "2016-10-12",
        "tags": [
          "國土",
          "公共治理",
          "transcript",
          "audio"
        ],
        "participants": "Audery Tang",
        "content": {
          "youtube": "",
          "transcript": "http://sayit.archive.tw/%E5%9C%8B%E5%9C%9F%E5%8F%8A%E5%85%AC%E5%85%B1%E6%B2%BB%E7%90%86%E5%AD%A3%E5%88%8A%E7%AC%AC16%E6%9C%9F-%E6%94%BF%E7%AD%96%E5%B0%8D%E8%AB%872",
          "soundcloud": "https://soundcloud.com/audrey-tang/2016-10-12-16a"
        }

      },
      {
        "title": "AmCham Cybersecurity Forum",
        "date": "2016-10-06",
        "tags": [
          "American Chamber",
          "cyber-attack",
          "video"
        ],
        "participants": "Audery Tang",
        "content": {
          "youtube": "https://www.youtube.com/watch?v=yxxMSt3fmKw",
          "transcript": "",
          "soundcloud": ""
        }

      }
    ];

  }

}
