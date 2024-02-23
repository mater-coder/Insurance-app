import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MicrofrontendRoutingModule } from './microfrontend-routing.module';
import { MicrofrontendComponent } from './microfrontend.component';
export { MicrofrontendComponent };

@NgModule({
  declarations: [
    MicrofrontendComponent
  ],
  imports: [
    CommonModule,
    MicrofrontendRoutingModule,
    FormsModule
  ],
  exports: [MicrofrontendComponent],
})
export class MicrofrontendModule { }
