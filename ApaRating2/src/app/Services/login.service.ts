import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as forge from 'node-forge';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  private Username = new BehaviorSubject<any>(localStorage.getItem('username'));
  private Id = new BehaviorSubject<any>(localStorage.getItem('id'));
  private IsLoggedIn = new BehaviorSubject<any>(localStorage.getItem('islogged'));
  private IsFirst = new BehaviorSubject<any>(localStorage.getItem('isFirst'));

  private IsSecond = new BehaviorSubject<any>(localStorage.getItem('isSecond'));

  private IsThird = new BehaviorSubject<any>(localStorage.getItem('isThird'));
  private IsHR = new BehaviorSubject<any>(localStorage.getItem('isHR'));
  private IsFinal = new BehaviorSubject<any>(localStorage.getItem('isFinal'));

  
  url: string = environment.apiUrl + 'employees/username';
  superurl: string = environment.apiUrl + 'Generals/';
publicKey:string='';
  isAuthenticate(data: any) {
     return this.http.post(`${this.url}`,data).pipe(
      map((result: any) => {
        if (result.Name) {
          this.Username = new BehaviorSubject<any>(result.Name);
          this.Id = new BehaviorSubject<any>(result.Guid);
          this.IsLoggedIn = new BehaviorSubject<any>("true");

          this.isFirstLine(result.Guid);
          this.isSecondLine(result.Guid);
          this.isThirdLine(result.Guid);
          this.isFinal(result.Guid);
          this.isHr(result.Guid);
          localStorage.setItem('username', result.Name);
          localStorage.setItem('id', result.Guid);
          localStorage.setItem('islogged', "true");

        }

        return result;
      })
    );
  }
  logOut() {

    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('islogged');
    localStorage.removeItem('isFirst');
    localStorage.removeItem('isSecond');
    localStorage.removeItem('isThird');
    localStorage.removeItem('isHR');
    localStorage.removeItem('isFinal');

    this.Username = new BehaviorSubject<any>(localStorage.getItem('username'));
    this.Id = new BehaviorSubject<any>(localStorage.getItem('id'));
    this.IsLoggedIn = new BehaviorSubject<any>(localStorage.getItem('islogged'));
    this.IsFirst = new BehaviorSubject<any>(localStorage.getItem('isFirst'));
    this.IsSecond = new BehaviorSubject<any>(localStorage.getItem('isSecond'));
    this.IsThird = new BehaviorSubject<any>(localStorage.getItem('isThird'));
    this.IsHR = new BehaviorSubject<any>(localStorage.getItem('isHR'));
    this.IsFinal = new BehaviorSubject<any>(localStorage.getItem('isFinal'));

    return true;
  }

  isFirstLine(userId: any) {
    return this.http.get(`${this.superurl}IsFirstLine?empId=${userId}`).pipe(
      map((result: any) => {

        if (result == 1) {
          this.IsFirst = new BehaviorSubject<any>("1");
          localStorage.setItem('isFirst', "1");
        }
        else {
          this.IsFirst = new BehaviorSubject<any>("0");
          localStorage.setItem('isFirst', "0");
        }
        return true;
      })

    );
  }
  isSecondLine(userId: any) {
    return this.http.get(`${this.superurl}IsSecondLine?empId=${userId}`).pipe(
      map((result: any) => {
        if (result == 1) {
          this.IsSecond = new BehaviorSubject<any>("1");
          localStorage.setItem('isSecond', "1");
        }
        else {
          this.IsSecond = new BehaviorSubject<any>("0");
          localStorage.setItem('isSecond', "0");
        }
        return true;
      })
    );
  }
  isThirdLine(userId: any) {
    return this.http.get(`${this.superurl}IsThirdLine?empId=${userId}`).pipe(
      map((result: any) => {
        if (result == 1) {
          this.IsThird = new BehaviorSubject<any>("1");
          localStorage.setItem('isThird', "1");
        }
        else {
          this.IsThird = new BehaviorSubject<any>("0");
          localStorage.setItem('isThird', "0");
        }
        return true;
      })
    );
  }
  isHr(userId: any) {
    return this.http.get(`${this.superurl}IsHR?empId=${userId}`).pipe(
      map((result: any) => {
        if (result == 1) {
          this.IsHR = new BehaviorSubject<any>("1");
          localStorage.setItem('isHR', "1");
        }
        else {
          this.IsHR = new BehaviorSubject<any>("0");
          localStorage.setItem('isHR', "0");
        }
        return true;
      })
    );
  }
  isFinal(userId: any) {
    return this.http.get(`${this.superurl}IsFinalized?empId=${userId}`).pipe(
      map((result: any) => {
        if (result == 1) {
          this.IsFinal = new BehaviorSubject<any>("1");
          localStorage.setItem('isFinal', "1");
        }
        else {
          this.IsFinal = new BehaviorSubject<any>("0");
          localStorage.setItem('isFinal', "0");
        }
        return true;
      })
    );
  }
  get getUsername() {
    return this.Username.asObservable();
  }
  get getId() {
    return this.Id.asObservable();
  }
  get isLogged() {
    return this.IsLoggedIn.asObservable();
  }
  get getFirstLine() {
    return this.IsFirst.asObservable();
  }
  get getSecondLine() {
    return this.IsSecond.asObservable();
  }
  get getThirdLine() {
    return this.IsThird.asObservable();
  }
  get getHR() {
    return this.IsHR.asObservable();
  }
  get getFinal() {
    return this.IsFinal.asObservable();
  }
}
