import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MicrofrontendModule } from './microfrontend/microfrontend.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MicrofrontendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
