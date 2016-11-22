import { DetailComponent } from './what-we-do/detail/detail.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { HowWeWorkComponent } from './how-we-work/how-we-work.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: WhatWeDoComponent },
  { path: 'what-we-do/:id', component: DetailComponent },
  { path: 'what-we-do', component: WhatWeDoComponent },
  { path: 'how-we-work', component: HowWeWorkComponent },
  { path: 'get-involved', component: GetInvolvedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
