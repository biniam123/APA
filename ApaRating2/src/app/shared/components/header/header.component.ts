import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any>= new EventEmitter();
  constructor(private loginSvc:LoginService,private router:Router) { }

  Username$!: Observable<string>;
  Id$!: Observable<string>;
  LoginStatus$!:Observable<boolean>;
  
  ngOnInit(): void {
    this.Username$=this.loginSvc.getUsername;
    this.Id$=this.loginSvc.getId;
    this.LoginStatus$=this.loginSvc.isLogged;
  }
  
  togglesidebar(){
    this.toggleSidebarForMe.emit();
  }
  LogOut(){
    if(this.loginSvc.logOut()){
      this.router.navigate(['/login']);
    }
  }

}
