import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { IPaidPremiumDetails } from 'src/model/ipaid-premium-details';

@Component({
  selector: 'app-microfrontend',
  templateUrl: './microfrontend.component.html',
  styleUrls: ['./microfrontend.component.scss'],
})
export class MicrofrontendComponent implements OnInit {
  premiumInformation: any = undefined;
  insuranceName: string = '';
  premiumAmount: number | null = null;
  enteredAmount: number | null = null;
  disableInputField: boolean = true;
  showPayButton: boolean = false;
  errorMessage: string = '';
  paymentSuccess: boolean = false;

  ngOnInit(): void {
    fromEvent(window, 'event').subscribe((event: any) => {
      this.premiumInformation = event.detail;
      this.insuranceName = this.premiumInformation.name;
      if (this.premiumInformation != undefined) {
        this.disableInputField = false;
      } else {
        this.disableInputField = true;
      }
    });
  }

  payEmi(paymentInfo: any) {
    const event = new CustomEvent('customEvent', {
      detail: this.paidEmiDetails(paymentInfo),
    });
    dispatchEvent(event);
    this.enteredAmount = null;
    this.insuranceName = '';
    this.showPayButton = false;
  }

  private paidEmiDetails(paymentInfo: any) {
    const paidInsuranceDetails: IPaidPremiumDetails = {
      id: this.premiumInformation.id,
      name: this.premiumInformation.name,
      emiValue: paymentInfo.premiumAmount,
    };
    return paidInsuranceDetails;
  }

  validateEmiValue(): void {
    if (
      this.enteredAmount !== null && 
      this.enteredAmount < this.premiumInformation.emiValue
    ) {
      this.showPayButton = false;
      this.errorMessage =
        'Entered amount should not be less than Rs.' +
        this.premiumInformation.emiValue;
    } else {
      if(this.enteredAmount === null) this.showPayButton = false;
      this.showPayButton = true;
      this.errorMessage = '';
    }
  }
}
