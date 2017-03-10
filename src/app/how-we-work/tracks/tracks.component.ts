import { ActivatedRoute } from '@angular/router';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { element } from 'protractor';
import { DataService } from './../../shared/dataService/data-service.service';
import { Http } from '@angular/http';
import { ConvertService } from './../../shared/convertService/convert.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { Discourselink } from './../../../assets/discourselink';

// declare var particlesJS: any;
declare var WOW: any;

@Component({
    selector: 'app-tracks',
    templateUrl: './tracks.component.html',
    styleUrls: ['./tracks.component.scss']
})

export class TracksComponent implements OnInit {

    tags = [];
    total = [];
    // q = "";
    more_url: string = ""

    constructor(
        private dataService: DataService,
        private convertService: ConvertService,
        private http: Http,
        private activatedRoute: ActivatedRoute
    ){}

    private getCategories() { //取得分類(置頂文章)
        return this.http.get(Discourselink.Host + Discourselink.Text + Discourselink.HOWWEWORKTRACK + "/73.json?include_raw=1")
                        .map(res => {
                            let data = res.json()
                            let raw = data['post_stream']['posts'][0]['raw']
                            let categories = this.convertService.convertYAMLtoJSON(raw)
                            return categories
                        })
    }

    private getIds(q: string) { //取得討論區每篇文的ID
        /* fetch date base on if 'q' query string exist */
        let query = (q === '') ?
                    (Discourselink.Host + Discourselink.Category + Discourselink.HOWWEWORKTRACK + Discourselink.Filename) :
                    (Discourselink.Host + Discourselink.Tags + Discourselink.Category + Discourselink.HOWWEWORKTRACK + '/' + q + Discourselink.Filename)

        // console.log(query)
        return this.http
                   .get(query)
                   .map(function(data) {
                       data = data.json();
                       let ids = [];
                       let topics = data['topic_list']['topics'];
                       topics.forEach(function(topic) {
                           ids.push(topic['id']);
                       });
                       return ids;
                   })
    }

    private getPost(id: string) { // 取得單篇PO文
        return this.http.get(Discourselink.Host + Discourselink.Text + id + ".json?include_raw=1")
                        .map(res => {
                            let data = res.json();
                            let post = {};
                            post['title'] = data['title'];
                            post['date'] = data['created_at'];
                            post['tags'] = data['tags'];
                            // post['content'] = data['post_stream']['posts'][0]['raw'];
                            let raw = data['post_stream']['posts'][0]['raw'];
                            post['content'] = this.convertService.convertYAMLtoJSON(raw)['content']
                            return post;
                        })
    }

    private categorizePost(post, categories) { //將每篇PO文與各分類中的關鍵字比對
        // categories = {conference:['xx','oo'], ...}
        // post = {title:'xxxoo'}
        /* set default */
        post['category'] = 'Other';
        Object.keys(categories).forEach(key => {
            for (var i = 0; i < categories[key].length; i++) {
                if (post['title'].indexOf(categories[key][i]) > -1) {
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
            // '/c/pdis-site/how-we-work-track/l/latest.json?page=1'
            this.http
                .get(Discourselink.Host + more_url.replace(/latest/,'latest.json'))
                .map(rspn => rspn.json().topic_list.more_topics_url)
                .subscribe(more_url => this.more_url = more_url)

            /* init categories */
            this.getCategories().subscribe(categories => {

                /* fetch 30 more post from backend when user hit the ground (call this) */
                // data["topic_list"]["more_topics_url"] = "/c/pdis-site/how-we-work-track/l/latest?page=1"
                this.http
                .get(Discourselink.Host + more_url.replace(/latest/,'latest.json'))
                .map(rspn => rspn.json().topic_list.topics)
                .subscribe(topics => {
                    /* seems that first post will duplicate with previous last post */
                    // topics.slice(1)
                    
                    /* use topics[i].id to get each post */
                    for(let topic of topics){

                        this.getPost(topic.id).subscribe(post => {

                            /* distribute category for each post */
                            post = this.categorizePost(post, categories);
                            /* category: All */
                            this.total[0]['posts'].push(post);
                            /* category: Other, etc... */
                            let cat_list = this.total.map(cat => cat['category'])
                            let cat_index = cat_list.indexOf(post['category'])
                            this.total[cat_index]['posts'].push(post)
                            /* need sort? */
                            this.total[cat_index]['posts'].sort((a, b) => b.date - a.date)
                        })
                    }
                })
            })
        }
    }

    /* an event handler to go #anchor scroll position */
    goAnchor(anchor){
        if(anchor == "top"){
        /* go to top */
        $('html, body').animate({
            scrollTop: 0,
        }, 1000)
        }
        else if(anchor){
        /* get the top position of anchor */
        let anchor_y = $(anchor).offset().top
        /* go to anchor (animation to do) */
        $('html, body').animate({
            scrollTop: anchor_y,
        }, 1000)
        }
        return false
    }

    ngOnInit() {
        /* WOW for animateCSS */
        new WOW().init();

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

        /* init categories tab header */
        this.getCategories()
            .subscribe(cats => {
                /* if cate-tab already generated then break */
                if(this.total.length > 0) return
                this.total.push({ category: 'All', posts: new Array<string>() })
                Object.keys(cats).forEach(key => this.total.push({ category: key, posts: new Array<string>() }))
                this.total.push({ category: 'Other', posts: new Array<string>() })
            })

        /* Tag Query & Timeline */
        let categories
        let q:string
        this.activatedRoute.queryParams
            .do(param => q = param['q'] || '')
            /* empty all the total[n].posts */
            .do(() => this.total.forEach(t => t.posts = []))
            .mergeMap(() => this.getCategories())
            /* save for later use */
            .do(cats => categories = cats)
            /* get the posts' id */
            .mergeMap(() => this.getIds(q))
            /* discard first post if no tag query (avoid the head post) */
            /* concat observable<any[]> into observable[]<> */
            .mergeMap(ids => (q) ? ids : ids.slice(1))
            /* get the posts by ids */
            /* flatten observable<observable> into observable<> */
            .mergeMap(id => this.getPost(id))
            .subscribe(post => {
                // console.log(post);
                post = this.categorizePost(post, categories)
                /* put in ALL */
                this.total[0]['posts'].push(post);
                /* put in respective category */
                this.total.forEach(object => {
                    if (object['category'] === post['category']) {
                        object['posts'].push(post);
                    }
                    /* sort by date */
                    object['posts'].sort(function(a, b) {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    })
                })
                // console.log(post)
            })

        /* get the first more_url */
        this.getMorePosts(this.more_url)
    }

}
