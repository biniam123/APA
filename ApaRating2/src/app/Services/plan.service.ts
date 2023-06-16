import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient ) { }
  url:string=environment.apiUrl+'Plans/';
  saveurl:string=environment.apiUrl+'Plans?empId=';
  getPlanByEmpId(id:any, period:any, createdBy:any){
      return this.http.get(`${this.url}empId?empId=${id}&period=${period}&createdBy=${createdBy}`);
    }
    getPlan(id:any, period:any){
      return this.http.get(`${this.url}EmId?empId=${id}&period=${period}`);
    }
    getPlanById(id:any){
      return this.http.get(`${this.url}Id?Id=${id}`);
    }
    getAllPlan(period: any){
      return this.http.get(`${this.url}Period?period=${period}`);
    }
    approvePlan(empId:any, period:any, updatedBy:any){
      return this.http.put(`${this.url}approve?empId=${empId}&period=${period}&updatedBy=${updatedBy}`,0);
    }
    getExpectedPlan(){
      return this.http.get(`${this.url}expected`);
    }
    getExpectedPlanById(id:any){
      return this.http.get(`${this.url}expectedId?expectedId=${id}`);
    }
    updateExpected(id:any,updatedBy:any,data:any){
return this.http.put(`${this.url}deptId?deptId=${id}&updatedBy=${updatedBy}`,data);
    }
    saveExpected(id:any,data:any){
      return this.http.post(`${this.url}expected?empId=${id}`,data);
    }
    deleteExpected(id:any){
      return this.http.delete(`${this.url}deptId?deptId=${id}`);
    }
    updatePlanById(id:any,createdBy:any,data:any){
      return this.http.put(`${this.url}Id?id=${id}&updatedBy=${createdBy}`,data);
    }
    deletPlan(id:any){
      return this.http.delete(`${this.url}Id?id=${id}`);
    }
    savePlan(id:any,createdBy:any, period:any,data:any){
      return this.http.post(`${this.saveurl}${id}&createdBy=${createdBy}&period=${period}`,data);
    }
}
