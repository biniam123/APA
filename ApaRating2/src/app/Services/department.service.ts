import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
  url:string=environment.apiUrl+'departments';
  getDepartments(){
    return this.http.get(this.url);
  }

}
