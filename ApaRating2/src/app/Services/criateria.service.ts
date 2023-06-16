import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriateriaService {

  constructor(private http:HttpClient) { }
  url:string=environment.apiUrl+'Criaterias?';
  

  getCriateria(empId:any, period:any){
      return this.http.get(`${this.url}id=${empId}&period=${period}`);
    }
    SaveCriateria(empId:any, createdBy:any,data:any, period:any){
      return this.http.post(`${this.url}empId=${empId}&createdBy=${createdBy}&period=${period}`,data);
    }
    
}
