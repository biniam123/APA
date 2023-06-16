import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApaStatusService {

  constructor(private http:HttpClient) { }
  url:string= environment.apiUrl+'ApaStatus';
  saveurl:string=environment.apiUrl+'ApaStatus?empId=';

  getAPAStatus(){
    return this.http.get(this.url);
  }
  getAPAStatusById(id:any){
    return this.http.get(`${this.url}/${id}`);
  }
  saveApaStatus(empId:any,data:any){
    return this.http.post(`${this.saveurl}${empId}&createdBy=${empId}`,data);
  }
  updateApaStatus(empId:any,data:any){
    return this.http.put(`${this.url}?empid=${empId}`,data);
  }
  deleteApaStatus(id:any){
    return this.http.delete(`${this.url}?id=${id}`);
  }
  getStatusReportByDepartment(depId:any,location:any){
    return this.http.get(`${this.url}/department?department=${depId}&location=${location}`);
  }
  getStatusReportByLocation(id:any){
    return this.http.get(`${this.url}/location?location=${id}`);
  }
  getStatusReportByDivision(id:any,location:any){
    return this.http.get(`${this.url}/division?division=${id}&location=${location}`);
  }
}
