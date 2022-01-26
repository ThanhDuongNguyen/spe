import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageCreateComponent } from './landingpage-create/landingpage-create.component';

const routes: Routes = [
  {path: '', component:LandingpageCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
