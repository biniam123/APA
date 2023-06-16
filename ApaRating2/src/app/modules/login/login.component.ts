import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import * as forge from 'node-forge';
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginsvc:LoginService,private router: Router) { }
  errorMessage:string="";
  login=new FormGroup({
    Username:new FormControl(''),
    Password:new FormControl('')
  });
  data:string="";
  
  ngOnInit(): void {
  }

  Login(){
    if(this.login.valid){
      this.loginsvc.isAuthenticate(this.login.value).subscribe((result)=>
      {
        if(result.Guid!="00000000-0000-0000-0000-000000000000"){
          this.loginsvc.isFirstLine(result.Guid).subscribe((resul:any)=>{
            if(resul){
              this.loginsvc.isSecondLine(result.Guid).subscribe((resu:any)=>{
                if(resu){
                  
                  this.loginsvc.isHr(result.Guid).subscribe((res:any)=>{
                    if(res){
                      this.loginsvc.isFinal(result.Guid).subscribe((r:any)=>{
                        if(r){
                          this.loginsvc.isThirdLine(result.Guid).subscribe((rest:any)=>{
                            if(rest){
                              this.loginsvc.getId.subscribe(result => {
                                if(result){
                                  this.router.navigate(['/dashboard']);
                                }
                                
                              });
                              
                            }
                          })
                          
                        }
                      })
                      
                    }
                  });
                  
                }
              });
            }
          });
          
          
        }
        else{
          this.login.reset({});
          this.errorMessage="Login Failed. Incorrect username or Password. Or check your Internet connection";
        }
      });
    }
  }

}
