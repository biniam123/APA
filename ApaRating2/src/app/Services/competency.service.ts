import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  constructor(private http:HttpClient) { }
  superurl:string=environment.apiUrl+'Competencies/supervisory?empId=';
  nonsuperurl:string=environment.apiUrl+'Competencies/nonsupervisory?empId=';
  saveurl:string=environment.apiUrl+'Competencies?empId=';
  urls=environment.apiUrl+'Competencies/super?empId=';
  urlns=environment.apiUrl+'Competencies/nonsuper?empId=';
  getSupervisoryCompetency(empId:any,period: any,createdBy:any){
      return this.http.get(`${this.superurl}${empId}&period=${period}&createdBy=${createdBy}`);
    }
    getSuperCompetency(empId:any, period:any){
      return this.http.get(`${this.urls}${empId}&period=${period}`);
    }
    getNonSupervisoryCompetency(empId:any,period:any,createdBy:any){
      return this.http.get(`${this.nonsuperurl}${empId}&period=${period}&createdBy=${createdBy}`);
    }
    getNonSuperCompetency(empId:any, period:any){
      return this.http.get(`${this.urlns}${empId}&period=${period}`);
    }
    SaveCompetency(empId:any,data:any, createdBy:any,type:any){
      return this.http.post(`${this.saveurl}${empId}&createdBy=${createdBy}&type=${type}`,data);
    }
}
