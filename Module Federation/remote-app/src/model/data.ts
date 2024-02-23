export class Data{

    private insuranceInfo: any = [
          {
            id: "1",
            name: "Life Insurance",
            paidPremium: 582000,
            amountToPay: 348348,
            emiValue: 5000,
            paymentStatus: "Paid"
          },
          {
            id: "2",
            name: "Car Insurance",
            paidPremium: 468000,
            amountToPay: 232000,
            emiValue: 3000,
            paymentStatus: "Paid"
          },
          {
            id: "3",
            name: "Bike Insurance",
            paidPremium: 500000,
            amountToPay: 100000,
            emiValue: 2243,
            paymentStatus: "Pending"
          }
        ]

    public setInsuranceInfo(userPaidInfo: any){
        
        
        this.insuranceInfo[userPaidInfo.id - 1].paidPremium = userPaidInfo.paidPremium;
        this.insuranceInfo[userPaidInfo.id - 1].amountToPay = userPaidInfo.amountToPay;
        this.insuranceInfo[userPaidInfo.id - 1].paymentStatus = userPaidInfo.paymentStatus;
    }

    public getInsuranceInfo(){
        return this.insuranceInfo;
    }
}