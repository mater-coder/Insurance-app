import { loadRemoteModule } from '@angular-architects/module-federation';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { IWebWorker } from 'src/model/iweb-worker';

import { ConfigService } from 'src/service/ConfigService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appRoutes: Routes = [];
  title = 'insurance-shell';

  child1Reference: any;
  child2Reference: any;
  textContent = "";
  info: any;
  showLegendFlag: boolean = false;
  changeBannerMessage: boolean = true;
  saveLog: boolean = true;

   ngOnInit(): void {
    window.addEventListener('message', this.receivePremiumNotificationMFE1.bind(this));
  } 
 

  showLegends(){
    this.showLegendFlag = !this.showLegendFlag;
  }

  constructor(private http: HttpClient, private configService : ConfigService, private router : Router) {}

  receivePremiumNotificationMFE1(event: MessageEvent){
    if(event.data.id){
      // this.child2Reference.contentWindow.postMessage(event.data, '*');
      window.addEventListener('message', this.receivePaidPremiumfromMFE2.bind(this));
      if(this.changeBannerMessage){
        this.showBannerMessage("Request Sent.");
        this.changeBannerMessage = ! this.changeBannerMessage;
      }
      this.info = this.storeInsuranceInfo(event.data);
    }
  }

  receivePaidPremiumfromMFE2(event: MessageEvent){
    if(event.data.id){
      // this.child1Reference.contentWindow.postMessage(event.data, '*');
      if(!this.changeBannerMessage){
        this.showBannerMessage("Emi Paid Successfully.");
        this.changeBannerMessage = !this.changeBannerMessage;
      }
        const worker = new Worker(new URL('src/web_worker/web-worker.worker.ts', import.meta.url));
        worker.onmessage = ({data}) =>{
        };
        worker.postMessage(this.generateLogData());

        worker.addEventListener('message', (event) => {
          if(this.saveLog){
            this.http.post('http://localhost:3000/savedLogs', this.generateLogData()).subscribe(response =>{
            })
            this.saveLog  = !this.saveLog;
          }
      });
    }
  }

  private showBannerMessage(title: string){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: title
    });
  }

  private storeInsuranceInfo(insuranceInfo: any){
    const info = {
      name: insuranceInfo.name,
      emiAmount: insuranceInfo.emiValue
    }
    return info;
  }

  private generateLogData(): any {
    
      const logInfo: IWebWorker = {
        name: this.info.name,
        emiAmount: this.info.emiAmount,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        status: "SUCCESS"
      }
      return logInfo;
  }
  
}
