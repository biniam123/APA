import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginSvc: LoginService) { }

  

  FirstLine: any=false;
  SecondLine: any=false;
  ThirdLine: any=false;
  HR: any=false;
  Final:any=false;


  ngOnInit(): void {
    this.loginSvc.getFirstLine.subscribe((result:any)=>{
      if(result=="1")
        this.FirstLine=true;
      
    });
    this.loginSvc.getSecondLine.subscribe((res:any)=>{
      if(res=="1")
        this.SecondLine=true;
    });
    this.loginSvc.getThirdLine.subscribe((res:any)=>{
      if(res=="1")
        this.ThirdLine=true;
    });
    this.loginSvc.getHR.subscribe((re:any)=>{
      if(re=="1")
      this.HR=true;
    });
    this.loginSvc.getFinal.subscribe((re:any)=>{
      if(re=="1")
      this.Final=true;
    });
  }

}
