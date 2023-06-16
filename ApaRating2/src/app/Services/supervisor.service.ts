import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(private http:HttpClient) { }
  urlfirst:string=environment.apiUrl+'supervisors/first';
  urlsecond:string=environment.apiUrl+'Supervisors/Second';
  urlthird:string=environment.apiUrl+'supervisors/third';
  urljob:string=environment.apiUrl+'supervisors/job';
  urlsuper:string=environment.apiUrl+'Supervisors/Superjob?empId=';
  isSuper:string=environment.apiUrl+'Supervisors/isSuper?Id=';
  firstJob:string=environment.apiUrl+'Supervisors/FirstLineJob?Id=';
  getFirstLineSupervisor(){
    return this.http.get(this.urlfirst);
  }
  getFirstLineJob(id:any){
    return this.http.get(`${this.firstJob}${id}`);
  }
  getSecondLineSupervisor(){
    return this.http.get(this.urlsecond);
  }
  getThirdLineSupervisor(){
    return this.http.get(this.urlthird);
  }
  getJobTitle(){
    return this.http.get(this.urljob);
  }
  getSecondJobTitle(empId:any){
    return this.http.get(`${this.urlsuper}${empId}`);
  }
  IsSupervisoryPosition(id:any){
    return this.http.get(`${this.isSuper}${id}`);
  }
}
