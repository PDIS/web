import { ConvertService } from './shared/convertService/convert.service';
import { DataService } from './shared/dataService/data-service.service';
import { DiscourseService } from './discourse.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { DetailComponent } from './what-we-do/detail/detail.component';
import { HowWeWorkComponent } from './how-we-work/how-we-work.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { LogoComponent } from './logo/logo.component';
import { ToolsComponent } from './how-we-work/tools/tools.component';
import { TrackComponent } from './how-we-work/track/track.component';
import { JSONPipesPipe } from './shared/jsonPipes/jsonpipes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WhatWeDoComponent,
    DetailComponent,
    HowWeWorkComponent,
    GetInvolvedComponent,
    LogoComponent,
    ToolsComponent,
    TrackComponent,
    JSONPipesPipe
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
    ConvertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
