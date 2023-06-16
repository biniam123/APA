import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private loginSvc:LoginService) { }
  Username$!: Observable<string>;
  Id$!: Observable<string>;
  LoginStatus$!:Observable<boolean>;
  FirstLine$!: Observable<boolean>;
  SecondLine$!: Observable<boolean>;
  HR$!:Observable<boolean>;

  

  ngOnInit(): void {
    this.Username$=this.loginSvc.getUsername;
    this.Id$=this.loginSvc.getId;
    this.LoginStatus$=this.loginSvc.isLogged;
    this.FirstLine$=this.loginSvc.getFirstLine;
    this.SecondLine$=this.loginSvc.getSecondLine;
    this.HR$=this.loginSvc.getHR;
  }

}
