import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  constructor(private http:HttpClient){}
  saveurl:string=environment.apiUrl+'Objectivs?empId=';
  getempurl=environment.apiUrl+'Objectivs/';
  getIdurl=environment.apiUrl+'Objectivs/Id?Id=';
  getEmpObj=environment.apiUrl+'Objectivs/EmpObj?Id=';
  getRtdObj=environment.apiUrl+'Objectivs/Emp?Id=';
  getObj=environment.apiUrl+'Objectivs?Id=';
  url=environment.apiUrl+'Objectivs/updatedBy?updatedBy=';
  commenturl=environment.apiUrl+'Objectivs/comment?empId=';
  saveempcommenturl=environment.apiUrl+'Objectivs/comment/employee?empId=';
  firstcommenturl=environment.apiUrl+'Objectivs/comment/first?empId=';
  secondcommenturl=environment.apiUrl+'Objectivs/comment/second?empId=';
  approveurl=environment.apiUrl+'Objectivs/approve?empId=';
  final=environment.apiUrl+'Objectivs/Final?empId=';
  confirm=environment.apiUrl+'Objectivs/confirm?empId=';
  delete=environment.apiUrl+'Objectivs/delete?id=';
  
  saveObjectiveData(empId:any, objective:any, period:any, createdBy:any){
    return this.http.post(`${this.saveurl}${empId}&objective=${objective}&period=${period}&createdBy=${createdBy}`,0);
  }
  getObjectiveById(Id:any){
    return this.http.get(`${this.getIdurl}${Id}`);
  }
  getObjectiveByEmpId(empId:any,createdBy:any, period:any){
    return this.http.get(`${this.getempurl}${empId}?createdBy=${createdBy}&period=${period}`);
  }
  getFinalObjectiveByEmpId(empId:any){
    return this.http.get(`${this.final}${empId}`);
  }
  updateObjectiveData(objectiveData:any,updatedBy:any){
    return this.http.put(`${this.getempurl}${updatedBy}`,objectiveData);
  }
 
  deleteObjectiveData(objectiveId:any,deletedBy:any){
    return this.http.put(`${this.delete}${objectiveId}&deletedBy=${deletedBy}`,0);
  }
  
  getEmployeeObjective(empId:any, period:any){
    return this.http.get(`${this.getEmpObj}${empId}&period=${period}`);
  }
  getRatedObjective(empId:any, period:any){
    return this.http.get(`${this.getRtdObj}${empId}&period=${period}`).toPromise();
  }
  getEmployeeApa(empId:any, period:any){
    return this.http.get(`${this.getObj}${empId}&period=${period}`);
  }
  SaveRating(updatedBy:any,data:any){
    return this.http.put(`${this.url}${updatedBy}`,data).toPromise();
  }
  getComment(empId:any, period:any){
    return this.http.get(`${this.commenturl}${empId}&period=${period}`);
  }
  SaveComment(empId:any,createdBy:any,comment:any,period: any){
    return this.http.post(`${this.saveempcommenturl}${empId}&createdBy=${createdBy}&comment=${comment}&period=${period}`,0);
  }
  SaveManagerComment(empId:any,createdBy:any,comment:any){
    return this.http.post(`${this.firstcommenturl}${empId}&createdBy=${createdBy}&comment=${comment}`,0);
  }
  SaveSecongManagerComment(empId:any,createdBy:any,comment:any){
    return this.http.post(`${this.secondcommenturl}${empId}&createdBy=${createdBy}&comment=${comment}`,0);
  }
  ApproveRating(id:any, rate:any, FirstRating:any, status:any, period:any, createdBy:any){
    return this.http.put(`${this.approveurl}${id}&rate=${rate}&FirstRate=${FirstRating}&Status=${status}&period=${period}&createdBy=${createdBy}`,0);
  }
  ConfirmRating(empId:any,rate:any,createdBy:any){
    return this.http.put(`${this.confirm}${empId}&rate=${rate}&createdBy=${createdBy}`,0);
  }
}
