import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http:HttpClient) { }
  url:string=environment.apiUrl+'Cores?empId=';
  empurl:string=environment.apiUrl+'Cores/emp?empId=';
  getUrl=environment.apiUrl+'Cores/empId?empId=';

  getCore(empId:any, period:any,createdBy:any){
      return this.http.get(`${this.url}${empId}&period=${period}&createdBy=${createdBy}`);
    }
    SaveCore(empId:any, data:any, createdBy:any){
      return this.http.post(`${this.url}${empId}&createdBy=${createdBy}`,data);
    }
    SaveEmpCore(empId:any, data:any,createdBy:any){
      return this.http.post(`${this.empurl}${empId}&createdBy=${createdBy}`,data);
    }
    getEmployeeCore(empId:any, period: any){
      return this.http.get(`${this.getUrl}${empId}&period=${period}`);
    }
}
