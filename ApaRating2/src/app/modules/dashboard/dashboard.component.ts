import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import {Chart,registerables} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dsSvc: DashboardService, private loginSvc: LoginService, private rot: Router) {
    Chart.register(...registerables)

   }
  chartOptions: any = {};
  chartOptions2: any = {};
  chartOptions1:any=[];
  all: any;
  chart:any=[];
  chart2:any=[];
  chart3:any=[];
  location: any=[];
  actual:string[]=[];
  department: any=[];
  actualValue:string[]=[];
  userId: any = [];
  
  fetchAll = async (): Promise<any> => {
    await this.dsSvc.getAllCompletion().then((result: any) => {
      if (result) {
        this.all = result[0].Actual;
        this.chart=new Chart('canvas',{
          type:'pie',
          data:{
            labels:['Remaining (%)','Current Completion Status (%)'],
            datasets:[{
              data:[100-this.all,this.all]
            }]
          }
        }) 
      
      }
    });

  }

  fetchDepartment = async (): Promise<any> => {
    this.dsSvc.getLocationCompletion().then((res:any) => {
      if (res) {
        
        if(res.length>0){
          this.location[0]='';
          for(let x=0; x<res.length;x++){
            
            this.location[x]=res[x].Department;
            this.actual[x]=res[x].Actual;
          }
          
        }
        this.chart2=new Chart('canva',{
          type:'bar',
          
          data:{
            labels:[this.location[0],this.location[1],this.location[2],this.location[3],this.location[4],this.location[5]
            ,this.location[6],this.location[7],this.location[8],this.location[9],this.location[10],this.location[11]],
            datasets:[{
              label:'Completion Status',
              data:[this.actual[0],this.actual[1],this.actual[2],this.actual[3],this.actual[4],this.actual[5]
              ,this.actual[6],this.actual[7],this.actual[8],this.actual[9],this.actual[10],this.actual[11]]
              ,backgroundColor: [
                'rgba(254, 40, 145, 0.8)',
                'rgba(254, 190, 154, 0.8)',
                'rgba(254, 190, 20, 0.8)',
                'rgba(122, 190, 192, 0.8)',
                'rgba(122, 35, 20, 0.8)',
                'rgba(122, 254, 20, 0.8)',
                'rgba(122, 254, 237, 0.8)',
                'rgba(0, 149, 237, 0.8)',
                'rgba(60, 145, 143, 0.8)',
                'rgba(192, 60, 229, 0.8)',
                'rgba(192, 60, 30, 0.8)',
                'rgba(192, 90, 120, 0.8)'
              ],
              borderWidth: 0
            }
          ],
            
          }
        }) 
      }
    });
  }
  fetchPlan = async (): Promise<any> => {
    this.dsSvc.getPlanCompletion().then((res:any) => {
      if (res) {
        
        if(res.length>0){
          this.department[0]='';
          for(let x=0; x<res.length;x++){
            
            this.department[x]=res[x].Department;
            this.actualValue[x]=res[x].Actual;
          }
          
        }
        this.chart3=new Chart('plan',{
          type:'bar',
          
          data:{
            labels:[this.department[0],this.department[1],this.department[2],this.department[3],this.department[4],this.department[5]
            ,this.department[6],this.department[7],this.department[8],this.department[9],this.department[10],this.department[11]],
            datasets:[{
              label:'Completion Status',
              data:[this.actualValue[0],this.actualValue[1],this.actualValue[2],this.actualValue[3],this.actualValue[4],this.actualValue[5]
              ,this.actualValue[6],this.actualValue[7],this.actualValue[8],this.actualValue[9],this.actualValue[10],this.actualValue[11]]
              ,backgroundColor: [
                'rgba(254, 40, 145, 0.8)',
                'rgba(254, 190, 154, 0.8)',
                'rgba(254, 190, 20, 0.8)',
                'rgba(122, 190, 192, 0.8)',
                'rgba(122, 35, 20, 0.8)',
                'rgba(122, 254, 20, 0.8)',
                'rgba(122, 254, 237, 0.8)',
                'rgba(0, 149, 237, 0.8)',
                'rgba(60, 145, 143, 0.8)',
                'rgba(192, 60, 229, 0.8)',
                'rgba(192, 60, 30, 0.8)',
                'rgba(192, 90, 120, 0.8)'
              ],
              borderWidth: 0
            }
          ],
            
          }
        }) 
      }
    });
  }
  runAsyncFunctions = async () => {
    try {
      await this.fetchAll();
      await this.fetchDepartment();
      await this.fetchPlan();


    } catch (error) {
      
    }
  }


  ngOnInit(): void {

    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
    this.runAsyncFunctions();
    
  }

}
