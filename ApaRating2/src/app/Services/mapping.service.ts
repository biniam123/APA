import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http:HttpClient) { }
  empurl:string=environment.apiUrl+'EmployeeMappings';
  getEmployeeMapping(id:any,superId:any){
    return this.http.get(`${this.empurl}/mapped?empId=${id}&superId=${superId}`);
  }
  getAllMapping(){
    return this.http.get(`${this.empurl}`);
  }
  SaveMappedUser(data:any,createdBy:any){
    return this.http.post(`${this.empurl}?createdBy=${createdBy}`,data);
  }
  deleteMapping(id:any){
    return this.http.delete(`${this.empurl}/${id}`);
  }
}
