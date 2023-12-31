import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  url:string=environment.apiUrl+'locations';
  getLocation(){
    return this.http.get(this.url);
  }
}
