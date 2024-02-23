import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterViewInit, ApplicationRef, NgModule } from '@angular/core';
import { ROUTES, Router, RouterModule, Routes } from '@angular/router';
import { ConfigService } from 'src/service/ConfigService';
import { AppComponent } from './app.component';
import  oldRoutes from '../assets/route-config.json';


const newRoutes = oldRoutes
const initialRoutes : Routes = [


  { path: '', 
  outlet : "app1",
  loadChildren: () => {
    const mf1 = JSON.parse(localStorage.getItem('mfe1') || '{}');
    return loadRemoteModule({
      remoteEntry: mf1.remoteEntry,
      remoteName: mf1.remoteName,
      exposedModule: mf1.exposedModule
    }).then((m) => m[mf1.module]).catch(err => console.log(err));
  }
},
{ path: '', 
  outlet : "app2",
  loadChildren: () => {
    const mf2 = JSON.parse(localStorage.getItem('mfe2') || '{}');
    return loadRemoteModule({
      remoteEntry: mf2.remoteEntry,
      remoteName: mf2.remoteName,
      exposedModule: mf2.exposedModule
    }).then((m) => m[mf2.module]).catch(err => console.log(err));
  }
}  
];  

@NgModule({
  imports: [RouterModule.forRoot(initialRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule  {}