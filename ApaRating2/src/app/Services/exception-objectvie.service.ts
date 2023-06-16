import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExceptionObjectvieService {

  constructor(private http:HttpClient ) { }
  url:string=environment.apiUrl+'ExceptionObjectives/';
  saveurl:string=environment.apiUrl+'ExceptionObjectives?empId=';
  getExceptionObjectiveByEmpId(id:any, period:any){
      return this.http.get(`${this.url}empId?empId=${id}&period=${period}`);
    }
    getExceptionObjectiveById(id:any){
      return this.http.get(`${this.url}Id?Id=${id}`);
    }
    updateExceptionObjectiveById(id:any,objective:string,createdBy:any){
      return this.http.put(`${this.url}Id?id=${id}&updatedBy=${createdBy}&obj=${objective}`,0);
    }
    deleteExceptionObjectiveById(id:any){
      return this.http.delete(`${this.url}Id?id=${id}`);
    }
    saveExceptionObjectiveById(id:any, objective:string, period:any, createdBy:any){
      return this.http.post(`${this.saveurl}${id}&objective=${objective}&period=${period}&createdBy=${createdBy}`,0);
    }
}
