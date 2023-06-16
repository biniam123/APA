import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http:HttpClient) { }
  url:string=environment.apiUrl+'Divisions/';
  getDivisionByDptId(dptId:any){
      return this.http.get(`${this.url}${dptId}`);
    }
}
