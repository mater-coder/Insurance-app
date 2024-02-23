import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceDetailsService {

  private storageUrl = "http://localhost:3000/insurance";
  private S3Url = 'https://json-db-bucket.s3.amazonaws.com/db.json';
  private insuranceDetails: any;

  constructor(private http: HttpClient) {}

  getInsuranceDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.storageUrl);
  }

  updateInsuranceDetails(paidPremiumInformation: any): Observable<any> {
    const updateUrl = `${this.storageUrl}/${paidPremiumInformation.id}`;
    return this.http.put(updateUrl, paidPremiumInformation);
  }

  getInsurance() {
    return this.http.get(this.S3Url);
  }
}
