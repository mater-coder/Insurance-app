import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicrofrontendComponent } from './microfrontend.component';

const routes: Routes = [
  {
    path:"", component:MicrofrontendComponent, pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicrofrontendRoutingModule { }
