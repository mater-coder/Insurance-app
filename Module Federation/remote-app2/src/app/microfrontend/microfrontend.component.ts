import { Component, OnInit } from '@angular/core';
import { every, fromEvent } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IPaidPremiumDetails } from 'src/model/ipaid-premium-details';

@Component({
  selector: 'app-microfrontend',
  templateUrl: './microfrontend.component.html',
  styleUrls: ['./microfrontend.component.scss']
})
export class MicrofrontendComponent implements OnInit {

  premiumInformation: any = undefined;
  insuranceName: string = "";
  disableInputField: boolean = true;
  showPayButton: boolean = false;
  errorMessage: string = '';
  paymentSuccess: boolean = false;

  ngOnInit(): void {
    window.addEventListener('message', this.receivePremiumNotificationfromMFE1ThroughParent.bind(this));
    // fromEvent(window,'event').subscribe((event : any) =>{
    //   console.log(event);
    //   this.premiumInformation = event.detail;  
    //   this.insuranceName = this.premiumInformation.name;
    //   if(this.premiumInformation != undefined){
    //     this.disableInputField = false;
    //   }
    //   else{
    //     this.disableInputField = true;
    //   } 
    // })

  }

  payEmi(paymentInfo: any){    
    // const event = new CustomEvent('message' , {detail : this.paidEmiDetails(paymentInfo)})
    // dispatchEvent(event)
      window.parent.postMessage(this.paidEmiDetails(paymentInfo), environment.urls.parentApplicationUrl);
      setTimeout(() => {
        location.reload()
      }, 2000);
  }

  receivePremiumNotificationfromMFE1ThroughParent(event: MessageEvent){
    if(event.origin === environment.urls.parentApplicationUrl){
      this.premiumInformation = event.data;  
      this.insuranceName = this.premiumInformation.name;
      if(this.premiumInformation != undefined){
        this.disableInputField = false;
      }
      else{
        this.disableInputField = true;
      }    
    }  
  }

  private paidEmiDetails(paymentInfo: any){
    const paidInsuranceDetails : IPaidPremiumDetails ={
      id: this.premiumInformation.id,
      name: this.premiumInformation.name,
      emiValue: paymentInfo.premiumAmount,
    }
    return paidInsuranceDetails;

  }

  validateEmiValue(enteredAmount: string): void {
    if (enteredAmount < this.premiumInformation.emiValue) {
      this.showPayButton = false;
      this.errorMessage = 'Entered amount should not be less than Rs.' + this.premiumInformation.emiValue;
    } else {
      this.showPayButton = true;
      this.errorMessage = '';
    }
  }

}
