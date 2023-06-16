import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  url:string=environment.apiUrl+'Employees/name?name=';
  saveurl:string=environment.apiUrl+'Employees?empId=';
  isSuper:string=environment.apiUrl+'Employees/isSuper?empId=';
  urlusername:string=environment.apiUrl+'Employees/username/username?empId=';
  emailurl:string=environment.apiUrl+'Employees/email?to='
  existurl=environment.apiUrl+'Employees/isExist?empId=';
  empurl:string=environment.apiUrl+'Employees/employee?name=';
  period:string=environment.apiUrl+'Employees/empByPeriod?empId=';
  
  getEmployeeFromAdByName(empName:any){
    return this.http.get(`${this.url}${empName}`);
  }
  SaveProfile(empId:any,createdBy:any,data:any){
    return this.http.post(`${this.saveurl}${empId}&createdBy=${createdBy}`,data);
  }
  IsSupervisory(empId:any, period:any){
    return this.http.get(`${this.isSuper}${empId}&period=${period}`);
  }
  getUserNameById(empId:any){
    return this.http.get(`${this.urlusername}${empId}`);
  }
  SendEmail(to:any,subject:any,body:any){
    return this.http.get(`${this.emailurl}${to}&subject=${subject}&body=${body}`);
  }
  IsExist(empId:any, period:any){
    return this.http.get(`${this.existurl}${empId}&period=${period}`);
  }
  getEmployeeDetail(empId:any, period:any){
    return this.http.get(`${this.saveurl}${empId}&period=${period}`);
  }
  getEmployee(name:any, period:any){
    return this.http.get(`${this.empurl}${name}&period=${period}`);
  }
  getEmployeeByPeriod(empId:any, period:any){
    return this.http.get(`${this.period}${empId}&performancePeriod=${period}`)
  }
}
