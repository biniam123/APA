import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApaRatingService {

  constructor(private http:HttpClient) { }
  url:string=environment.apiUrl+'aparatings';
  getApaRatings(){
    return this.http.get(this.url);
  }
}
