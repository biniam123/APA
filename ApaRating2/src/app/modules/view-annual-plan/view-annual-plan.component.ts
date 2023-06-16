import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoginService } from 'src/app/Services/login.service';
import { PlanService } from 'src/app/Services/plan.service';

@Component({
  selector: 'app-view-annual-plan',
  templateUrl: './view-annual-plan.component.html',
  styleUrls: ['./view-annual-plan.component.scss']
})
export class ViewAnnualPlanComponent implements OnInit {

  constructor(private empSvc:EmployeeService,private loginSvc:LoginService,private rot:Router,private planSvc:PlanService, private datePipe:DatePipe) { }
  userId:any=[];
  searchKeyValue:string="";
  search=new FormGroup({
    searchKey:new FormControl(''),
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });
employeeList:any=[];
planList:any=[];
period: string ="";
displayedColumns: string[] = ['No','Name', 'Print'];
planColumns: string[] = ['No','Name','Location','Department','Division', 'Print'];

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
  }
  onSearchClear() {
    this.searchKeyValue = "";
    this.search.reset({});
  }
  PopulatePlan(){
    this.planSvc.getAllPlan(this.period).subscribe((result)=>{
      this.planList=result;
    })
  }
  onSearch()
  {
    this.period = this.datePipe.transform(this.search.controls['start'].value, "MM/dd/yyyy") + '-' + 
      this.datePipe.transform(this.search.controls['end'].value, "MM/dd/yyyy");
    if(this.search.controls["searchKey"].value != "")
    {
      this.empSvc.getEmployee(this.search.controls['searchKey'].value, this.period).subscribe((result) => {
        if (result) {
          this.employeeList = result;
        }
      });
    }
    else{
      this.PopulatePlan();
    }
  }
  onClose() {
    this.search.reset({});
    this.searchKeyValue = "";
  }

}
