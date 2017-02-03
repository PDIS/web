import { ActivatedRoute } from '@angular/router';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { element } from 'protractor';
import { DataService } from './../../shared/dataService/data-service.service';
import { Http } from '@angular/http';
import { ConvertService } from './../../shared/convertService/convert.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/toPromise';
import { Discourselink } from './../../../assets/discourselink';

// declare var particlesJS: any;

@Component({
    selector: 'app-tracks',
    templateUrl: './tracks.component.html',
    styleUrls: ['./tracks.component.scss']
})

export class TracksComponent implements OnInit {

    // posts = [];
    // counts = {};
    tags = [];
    // speeches = [];
    // meetings = [];
    // conferences = [];
    // interviews = [];
    // others = [];
    total = [];
    q = "";
    more_url: string

    constructor(
        private dataService: DataService,
        private convertService: ConvertService,
        private http: Http,
        private activatedRoute: ActivatedRoute)
    { }

    private getCategory() { //取得分類(置頂文章)
        return this.http.get(Discourselink.Host + Discourselink.Text + Discourselink.HOWWEWORKTRACK + "/73.json?include_raw=1")
            .map(function(data) {
                data = data.json();
                var rawString = data['post_stream']['posts'][0]['raw'];
                return rawString;
            })
    }

    private getIds() { //取得討論區每篇文的ID

        let data = (this.q === undefined) ?
                (this.http.get(Discourselink.Host + Discourselink.Category + Discourselink.HOWWEWORKTRACK + Discourselink.Filename)) :
                (this.http.get(Discourselink.Host + Discourselink.Tags + Discourselink.Category + Discourselink.HOWWEWORKTRACK + this.q + Discourselink.Filename))

        return data.map(function(data) {
                    data = data.json();
                    var ids = [];
                    var topics = data['topic_list']['topics'];

                    topics.forEach(function(topic) {
                        ids.push(topic['id']);
                    });

                    /* discard first post */
                    return ids.slice(1);
        })
    }

    private getPost(id: string) { // 取得每篇PO文
        return this.http.get(Discourselink.Host + Discourselink.Text + id + ".json?include_raw=1")
            .map(function(data) {
                data = data.json();
                var detail = {};
                detail['title'] = data['title'];
                detail['date'] = data['created_at'];
                detail['content'] = data['post_stream']['posts'][0]['raw'];
                detail['tags'] = data['tags'];
                return detail;


            })
    }

    private distribute_post(category, post) { //將每篇PO文與各分類中的關鍵字比對
        post['category'] = 'Other';
        Object.keys(category).forEach(key => {
            for (var i = 0; i < category[key].length; i++) {
                if (post['title'].indexOf(category[key][i]) > -1) {
                    post['category'] = key;
                    return post;
                }
            }
        })


        return post;

    }

    getMorePosts(more_url: string) {
        /* an event handler for more post */

        /* save link for getMorePosts() */
        if(more_url === "")
            this.http
                .get(Discourselink.Host + Discourselink.Category + Discourselink.HOWWEWORKTRACK + Discourselink.Filename)
                .map(rspn => rspn.json().topic_list.more_topics_url)
                .subscribe(more_url => this.more_url = more_url)
        else {
            // /c/pdis-site/how-we-work-track/l/latest.json?page=1
            this.http
                .get(Discourselink.Host + more_url.replace(/latest/,'latest.json'))
                .map(rspn => rspn.json().topic_list.more_topics_url)
                .subscribe(more_url => this.more_url = more_url)

            // /* fetch 30 more post from backend when user hit the ground (call this) */
            // // data["topic_list"]["more_topics_url"] = "/c/pdis-site/how-we-work-track/l/latest?page=1"
            this.http
                .get(Discourselink.Host + more_url.replace(/latest/,'latest.json'))
                // .toPromise()
                // .then(response => response.json().data)
                // .catch(error => console.error("more's error", error))
                .map(rspn => rspn.json().topic_list.topics)
                .subscribe(topics => {
                    /* seems that first post will duplicate with previous last post */
                    // topics.slice(1)
                    
                    /* use topics[i].id to get each post */
                    for(let topic of topics){

                        this.getPost(topic.id).subscribe(post => {
                            let content = this.convertService.convertYAMLtoJSON(post['content'])
                            post['content'] = content['content']
                            /* distribute category for each post */
                            post = this.distribute_post('Other', post);
                            /* category: All */
                            this.total[0]['posts'].push(post);
                            /* category: Other, etc... */
                            let cat_list = this.total.map(cat => cat['category'])
                            this.total[cat_list.indexOf(post['category'])]['posts'].push(post)
                            /* need sort? */
                            this.total[cat_list.indexOf(post['category'])]['posts'].sort((a, b) => b.date - a.date)
                        })

                    }

                })
        }
    }

    ngOnInit() {
        // ******************** particlesJS
        // particlesJS.load("particles", "../../assets/particles.json", function () {
        //     console.log('callback - particles.js config loaded');
        // });

        // Tag Query
        this.activatedRoute.params.subscribe(
            (param: any) => {
                this.q = param['q'];
                // console.log(this.q);
            });

        // Tags Cloud
        this.http.get(Discourselink.Host + "tags/filter/search.json")
            .map(data => {
                data = data.json();
                var tags = [];
                var discourseTags: [Object] = data['results'];
                for (var i in discourseTags) {
                    var tag = {};
                    tag['text'] = discourseTags[i]['text'];
                    tag['weight'] = discourseTags[i]['count'];
                    tag['link'] = "/#/how-we-work/tracks?q=" + discourseTags[i]['text'];
                    tags.push(tag);
                }
                return tags;
            })
            // .do(data => { console.log(data); })
            .subscribe(
                tags => { this.tags = tags; }
            );



        // Timeline
        this.getCategory().subscribe(category => {
            category = this.convertService.convertYAMLtoJSON(category)
            this.total.push({ category: 'All', posts: new Array<string>() });
            Object.keys(category).forEach(key => {
                this.total.push({ category: key, posts: new Array<string>() });
            })
            this.total.push({ category: 'Other', posts: new Array<string>() });

            this.getIds().subscribe(ids => {
                ids.forEach(id => {
                    this.getPost(id).subscribe(post => {

                        var content = this.convertService.convertYAMLtoJSON(post['content'])

                        post['content'] = content['content']

                        post = this.distribute_post(category, post); // match category

                        this.total[0]['posts'].push(post);
                        this.total.forEach(object => {
                            if (object['category'] === post['category']) {
                                object['posts'].push(post);
                            }
                            object['posts'].sort(function(a, b) {
                                return new Date(b.date).getTime() - new Date(a.date).getTime();
                            });
                        })
                       

                    })

                })

            })
            // console.log(this.total);
        });

        /* get the first more_url */
        this.getMorePosts("");
    }

}
