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
import 'rxjs/add/operator/concatMap';
import { Discourselink } from './../../../assets/discourselink';

// declare var particlesJS: any;
// declare var WOW: any;
declare var $: any;

@Component({
    selector: 'app-tracks',
    templateUrl: './tracks.component.html',
    styleUrls: ['./tracks.component.scss']
})

export class TracksComponent implements OnInit {

    tags = [];
    total = [];
    q:string = '';
    more_url: string = ''

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

    private getIds(q: string, more_url: string) { //取得討論區每篇文的ID & more_url
        /* fetch date base on if 'q' & 'more_url' exist */
        /*
            https://talk.pdis.nat.gov.tw/c/pdis-site/how-we-work-track
            /c/pdis-site/how-we-work-track/l/latest?page=1
            https://talk.pdis.nat.gov.tw/tags/c/pdis-site/how-we-work-track/TAG
            /tags/c/pdis-site/how-we-work-track/TAG/l/latest?page=1
        */
        let query
        if (q) {
            if (more_url) {
                query = Discourselink.Host + more_url.replace(/latest/,'latest.json')
            }
            else {
                query = Discourselink.Host + Discourselink.Tags + Discourselink.Category + Discourselink.HOWWEWORKTRACK + '/' + q + Discourselink.Filename
            }
        }
        else {
            if (more_url) {
                query = Discourselink.Host + more_url.replace(/latest/,'latest.json')
            }
            else {
                query = Discourselink.Host + Discourselink.Category + Discourselink.HOWWEWORKTRACK + Discourselink.Filename
            }
        }
        
        return this.http
            .get(query)
            /* to get more_url */
            .do(data => this.more_url = data.json().topic_list.more_topics_url || '')
            /* to get ids */
            .map(data => data.json().topic_list.topics.map(topic => topic['id']))
    }

    private getPost(id: {}) { // 取得單篇PO文
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

    getMorePosts(q:string, more_url:string) {
    /* an event handler to get more ids and then post them */
        let categories
        /* init categories */
        this.getCategories()
            .do(cats => categories = cats)
            /* get the posts' id */
            .mergeMap(() => this.getIds(q, more_url))
            /* seems that first post is duplicated */
            /* concat observable<any[]> into observable[]<> */
            .mergeMap(ids => ids.slice(1))
            /* get the posts by ids */
            .concatMap(id => this.getPost(id))
            .do(post => {
                post = this.categorizePost(post, categories)
                /* put in ALL */
                this.total[0]['posts'].push(post);
                /* put in respective category */
                let cat_list = this.total.map(cat => cat['category'])
                let cat_index = cat_list.indexOf(post['category'])
                this.total[cat_index]['posts'].push(post)
            })
            .subscribe()
    }

    /* an event handler to go #anchor scroll position */
    goAnchor(anchor) {
        // console.log(anchor)
        if (anchor == "top") {
            /* go to top */
            $('html, body').animate({
                scrollTop: 0,
            }, 300)
        }
        else if (anchor) {
            /* get the top position of anchor */
            let anchor_y = $(anchor).offset().top
            /* go to anchor (animation to do) */
            $('html, body').animate({
                scrollTop: anchor_y,
            }, 300)
        }
        return false
    }

    ngOnInit() {
        /* WOW for animateCSS */
        // new WOW().init();

        // Tags Cloud
        this.http.get(Discourselink.Host + "tags/filter/search.json")
            .map(data => {
                data = data.json();
                var tags = [];
                var discourseTags: [Object] = data['results'];
                for (var i in discourseTags) {
                    if (discourseTags[i]['text'] === '尚未回覆') { continue; }
                    if (/^wiselike-/.test(discourseTags[i]['text'])) { continue; }
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
        this.activatedRoute.queryParams
            .do(param => this.q = param['q'] || '')
            .do(() => { if(this.q) this.goAnchor('#cloud') })
            /* empty all the total[n].posts */
            .do(() => this.total.forEach(t => t.posts = []))
            .mergeMap(() => this.getCategories())
            /* save for later use */
            .do(cats => categories = cats)
            /* get the posts' id */
            .mergeMap(() => this.getIds(this.q, ''))
            /* discard first post if no tag query (avoid the head post) */
            /* concat observable<any[]> into observable[]<> */
            .mergeMap(ids => (this.q) ? ids : ids.slice(1))
            /* get the posts by ids */
            /* flatten observable<observable> into observable<> */
            /* use concat instead of merge to remain sorted */
            .concatMap(id => this.getPost(id))
            .do(post => {
                post = this.categorizePost(post, categories)
                /* put in ALL */
                this.total[0]['posts'].push(post);
                /* put in respective category */
                let cat_list = this.total.map(cat => cat['category'])
                let cat_index = cat_list.indexOf(post['category'])
                this.total[cat_index]['posts'].push(post)
            })
            .subscribe()
    }

}
