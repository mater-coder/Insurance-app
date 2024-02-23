import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from 'src/service/ConfigService';
import { ButtonComponent } from './shared/button.component';
// import { ButtonComponent } from './button/button.component';


 
@NgModule({
  declarations: [
    AppComponent,
    // ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // SharedModule,
  ],
  exports:[
    // ButtonComponent
  ],
  providers: [
    AppComponent
    /* ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadRoutes,
      deps: [ConfigService],
      multi: true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }

  // Function to fetch configuration and load routes
/* export function loadRoutes(configService: ConfigService) {
  return () => configService.loadRoutes();
} */
