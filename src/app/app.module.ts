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
import { TagCloudModule } from 'angular-tag-cloud-module';

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
    JSONPipesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TagCloudModule
  ],
  providers: [
    DataService,
    DiscourseService,
    ConvertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
