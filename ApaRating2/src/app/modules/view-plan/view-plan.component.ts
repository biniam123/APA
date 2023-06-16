import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/Services/excel-service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { PlanService } from 'src/app/Services/plan.service';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit {

  constructor(private router: ActivatedRoute,private planSvc:PlanService,private notification:NotificationService,
    private loginSvc:LoginService, private rot:Router,private excelSvc:ExcelService) { }
    displayColumns:string[]=['No','Perspective','CorporateObjective','WorkUnitObjective','IndividualObjectives','Weight','Measurement','EXP','FS','PS','UP'];
    excelColumns:string[]=['Employee Name','Perspective','CorporateObjective','WorkUnitObjective','IndividualObjectives','Weight','Measurement','EXP','FS','PS','UP'];
  plandata: any = [];
  empId: any = [];
  userId: any = [];
  Name:any=[];
  period: string ="";
  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        this.empId=this.router.snapshot.params['id'];
        this.period = this.router.snapshot.params['period'];
        this.PopulatePlan();
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
  }
  PopulatePlan() {
    this.planSvc.getPlan(this.empId, this.period).subscribe((result:any)=>{
      if(result){
        this.plandata=result;
        this.Name=result[0].EmployeeName;
      }
    });
  }
  exportToExcel(){
    this.excelSvc.exportAsExcelFile('Summary Report','',this.excelColumns,this.plandata,'View Plan','View Plan');
  }
  Approve(){
    this.planSvc.approvePlan(this.empId, this.router.snapshot.params['period'], this.userId).subscribe((result:any)=>{
      if(result){
        this.PopulatePlan();
        this.notification.success("Approved Successfully");
      }
    });
  }
}
