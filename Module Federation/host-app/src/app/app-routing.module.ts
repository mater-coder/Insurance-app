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
 loadChildren: () =>loadRemoteModule({
    remoteEntry: newRoutes.routes[0].remoteEntry,
    remoteName:newRoutes.routes[0].remoteName,
    exposedModule: newRoutes.routes[0].exposedModule
  }).then((m) => m[newRoutes.routes[0].module]).catch(err=>console.log(err)
  )
},
{ path: '', 
  outlet : "app2",
loadChildren: () =>loadRemoteModule({
  remoteEntry: newRoutes.routes[1].remoteEntry,
  remoteName:newRoutes.routes[1].remoteName,
  exposedModule: newRoutes.routes[1].exposedModule
}).then((m) => m[newRoutes.routes[1].module]).catch(err=>console.log(err)
)
}  
];  

@NgModule({
  imports: [RouterModule.forRoot(initialRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule  {}
