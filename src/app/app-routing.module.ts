import { DetailComponent } from './what-we-do/detail/detail.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { ToolsComponent } from './how-we-work/tools/tools.component';
import { TracksComponent } from './how-we-work/tracks/tracks.component';
import { HowWeWorkComponent } from './how-we-work/how-we-work.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkComponent } from "./what-we-do/work/work.component";
import { WorklistComponent } from "./what-we-do/worklist/worklist.component";
import { WhoWeAreComponent } from "./who-we-are/who-we-are.component";
// import { NotFoundComponent } from "./404/404.component";

const routes: Routes = [
  { path: 'what-we-do/worklist', component: WorklistComponent },
  { path: 'what-we-do/beliefs', component: WhatWeDoComponent },
  { path: 'what-we-do/:id', component: DetailComponent },
  { path: 'what-we-do', component: WhatWeDoComponent },
  { path: 'how-we-work/tools', component: ToolsComponent },
  { path: 'how-we-work/tracks', component: TracksComponent },
  { path: 'how-we-work', component: HowWeWorkComponent },
  { path: 'get-involved', component: GetInvolvedComponent },
  { path: 'who-we-are', component: WhoWeAreComponent },
  { path: '', redirectTo:'what-we-do', pathMatch:'full' },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
