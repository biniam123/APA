import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  superurl: string = environment.apiUrl+'Generals/';
getLocationCompletion(){
  return this.http.get(`${this.superurl}Location`).toPromise().then((data)=>{
    return data;
  });
}
getAllCompletion(){
  return this.http.get(`${this.superurl}All`).toPromise().then((data)=>{
    return data;
  });
}
getPlanCompletion(){
  return this.http.get(`${this.superurl}Plan`).toPromise().then((data)=>{
    return data;
  });
}
}
