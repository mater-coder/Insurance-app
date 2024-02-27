import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Data } from 'src/model/data';
import { IPremiumDetails } from 'src/model/ipremium-details';
import { ISendDetails } from 'src/model/isend-details';
import { InsuranceDetailsService } from 'src/service/insurance-details.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements AfterViewInit {
  title = 'insurance-mf1';
  insuranceDetails: any[] = [];
  selectedInsuranceId: number = 0;
  showSelectInsuranceMessage: boolean = false;
  private insurenceData: Data = new Data();
  private abortController: AbortController | undefined;
  buttonText = 'click Me';

  constructor(
    private insuranceService: InsuranceDetailsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.createReceiveEventListener();
  }

  ngAfterViewInit(): void {
    this.insuranceService.getInsurance().subscribe((data: any) => {
      this.insuranceDetails = data.insurance;
    });
    this.changeDetectorRef.detectChanges();
  }

  sendPayNotification(): void {
    if (this.selectedInsuranceId > 0) {
      this.showSelectInsuranceMessage = false;
      const event = new CustomEvent('event', {
        detail: this.generatePremiumDetailsToBeSend(
          this.insuranceDetails,
          this.selectedInsuranceId
        ),
      });
      dispatchEvent(event);
      this.selectedInsuranceId = 0;
    } else {
      this.showSelectInsuranceMessage = true;
    }
  }

  private createReceiveEventListener() {
    if (this.abortController == undefined) {
      this.abortController = new AbortController();
    }
    fromEvent(window, 'customEvent').subscribe((events: any) => {
      const userPaidEmiInfo = this.generatePremiumDetail(events.detail);
      this.updatePremiumInDB(userPaidEmiInfo);
      if (this.abortController) {
        this.abortController.abort();
        this.createReceiveEventListener();
      }
    });
  }

  private generatePremiumDetailsToBeSend(
    allAvailableInsuranceDetails: any[],
    userSelected: number
  ) {
    const premiumDetail: ISendDetails = {
      id: allAvailableInsuranceDetails[userSelected - 1].id,
      name: allAvailableInsuranceDetails[userSelected - 1].name,
      emiValue: allAvailableInsuranceDetails[userSelected - 1].emiValue,
    };
    return premiumDetail;
  }

  private generatePremiumDetail(userPaymentInfo: any) {
    const paidPremiumDetail: IPremiumDetails = {
      id: userPaymentInfo.id,
      name: userPaymentInfo.name,
      paidPremium:
        this.insuranceDetails[userPaymentInfo.id - 1].paidPremium +
        userPaymentInfo.emiValue,
      amountToPay:
        this.insuranceDetails[userPaymentInfo.id - 1].amountToPay -
        userPaymentInfo.emiValue,
      emiValue: this.insuranceDetails[userPaymentInfo.id - 1].emiValue,
      paymentStatus: 'Paid',
    };
    return paidPremiumDetail;
  }

  private updatePremiumInDB(userPaidEmiInfo: any) {
    this.insurenceData.setInsuranceInfo(userPaidEmiInfo);
    this.updatePremiumInWeb(userPaidEmiInfo);
  }

  private updatePremiumInWeb(userPaidEmiInfo: any) {
    this.insuranceDetails = this.insuranceDetails.map((insurance) => {
      if (insurance.id === userPaidEmiInfo.id) {
        return {
          ...insurance,
          paidPremium: userPaidEmiInfo.paidPremium,
          amountToPay: userPaidEmiInfo.amountToPay,
          paymentStatus: userPaidEmiInfo.paymentStatus,
        };
      }
      return insurance;
    });
  }

  getPaymentStatusColor(paymentStatus: string): string {
    return paymentStatus === 'Paid' ? 'green' : 'red';
  }
}
