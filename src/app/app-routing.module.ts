import { DetailComponent } from './what-we-do/detail/detail.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { ToolsComponent } from './how-we-work/tools/tools.component';
import { TracksComponent } from './how-we-work/tracks/tracks.component';
import { HowWeWorkComponent } from './how-we-work/how-we-work.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkComponent } from "app/what-we-do/work/work.component";
import { WorklistComponent } from "app/what-we-do/worklist/worklist.component";

const routes: Routes = [
  { path: '', redirectTo:'what-we-do', pathMatch:'full' },
  { path: 'what-we-do/work', component: WorkComponent },
  { path: 'what-we-do/worklist', component: WorklistComponent },
  { path: 'what-we-do/:id', component: DetailComponent },
  { path: 'what-we-do', component: WhatWeDoComponent },
  { path: 'how-we-work/tools', component: ToolsComponent },
  { path: 'how-we-work/tracks', component: TracksComponent },
  { path: 'how-we-work', component: HowWeWorkComponent },
  { path: 'get-involved', component: GetInvolvedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
