import { replacePipe } from './shared/replacePipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ConvertService } from './shared/convertService/convert.service';
import { DataService } from './shared/dataService/data-service.service';
import { DiscourseService } from './shared/discourseService/discourse.service';

import { AppComponent } from './app.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { HowWeWorkComponent } from './how-we-work/how-we-work.component';
import { ToolsComponent } from './how-we-work/tools/tools.component';
import { TracksComponent } from './how-we-work/tracks/tracks.component';
import { DetailComponent } from './what-we-do/detail/detail.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JSONPipesPipe } from './shared/jsonPipes/jsonpipes.pipe';
import { DatePipePipe } from './shared/datePipe/date-pipe.pipe';

import { Discourselink } from './../assets/discourselink';
import { WorkComponent } from "app/what-we-do/work/work.component";
import { WorklistComponent } from "app/what-we-do/worklist/worklist.component";
import { WhoWeAreComponent } from "./who-we-are/who-we-are.component";
import { MemberService } from "./shared/member-service/member.service"


@NgModule({
  declarations: [
    AppComponent,
    WhatWeDoComponent,
    HowWeWorkComponent,
    ToolsComponent,
    TracksComponent,
    DetailComponent,
    GetInvolvedComponent,
    HeaderComponent,
    FooterComponent,
    JSONPipesPipe,
    DatePipePipe,
    replacePipe,
    WorklistComponent,
    WorkComponent,
    WhoWeAreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    DiscourseService,
    ConvertService,
    Discourselink,
    MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
