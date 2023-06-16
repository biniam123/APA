import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  firsturl = environment.apiUrl+'Ratings/first?empId=';
  secondurl = environment.apiUrl+'Ratings/second?empId=';
  thirdurl = environment.apiUrl+'Ratings/third?empId=';
  isApproved = environment.apiUrl+'Ratings/';
  printurl = environment.apiUrl+'Ratings/print?empId=';
  constructor(private http: HttpClient) { }
  SaveFirstRating(empId: any, createdBy: any, data: any) {
    return this.http.post(`${this.firsturl}${empId}&createdBy=${createdBy}`, data);
  }
  SaveSecondRating(empId: any, createdBy: any, rating: any) {
    return this.http.post(`${this.secondurl}${empId}&createdBy=${createdBy}&rating=${rating}`, 0);
  }
  SaveThirdRating(empId: any, rating: any,createdBy: any ) {
    return this.http.post(`${this.thirdurl}${empId}&createdBy=${createdBy}&rating=${rating}`, 0);
  }
  IsFirstLineApprove(empId: any) {
    return this.http.get(`${this.isApproved}${empId}`);
  }
  IsSecondLineApprove(empId: any, period:any) {
    return this.http.get(`${this.isApproved}Approved?empId=${empId}&period=${period}`);
  }
  GetApprovedApa(empId: any, period:any) {
    return this.http.get(`${this.printurl}${empId}&period=${period}`);
  }
  getFirstLineRating(empId:any){
    return this.http.get(`${this.firsturl}${empId}`);
  }
  getSecondLineRating(empId:any){
    return this.http.get(`${this.secondurl}${empId}`);
  }
  getRating(empId:any, period:any){
    return this.http.get(`${this.isApproved}ratings?empId=${empId}&period=${period}`);
  }
  getSummaryReport(period:any){
    return this.http.get(`${this.isApproved}summary?period=${period}`);
  }
  getSummaryReportByLocation(location:any, period:any){
    return this.http.get(`${this.isApproved}location?location=${location}&period=${period}`);
  }
  getSummaryReportByDepartment(id:any,location:any, period:any){
    return this.http.get(`${this.isApproved}department?id=${id}&location=${location}&period=${period}`);
  }
  getSummaryReportByDivision(division:any,location:any, period: any){
    return this.http.get(`${this.isApproved}division?division=${division}&location=${location}&period=${period}`);
  }
}
