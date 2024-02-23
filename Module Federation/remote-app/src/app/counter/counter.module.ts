import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceDetailsService } from 'src/service/insurance-details.service';
import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter.component';
export { CounterComponent };
@NgModule({
  declarations: [
    CounterComponent,
  
  ],
  imports: [
    CommonModule,
    CounterRoutingModule,
    FormsModule,
    HttpClientModule,
  
  ],
  providers: [InsuranceDetailsService],
  exports: [CounterComponent],
})
export class CounterModule { }
