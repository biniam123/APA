import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoginService } from 'src/app/Services/login.service';
import { MappingService } from 'src/app/Services/mapping.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { PlanService } from 'src/app/Services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private emp: EmployeeService, private planSvc: PlanService, private rot: Router,private map:MappingService,
    private loginSvc: LoginService, private notification: NotificationService, private dialogsvc: DialogService, private datePipe:DatePipe) { }
  searchKeyValue: string = "";
  search = new FormGroup({
    searchKey: new FormControl(),
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });
  period : string ='';
  self: Boolean = false;
  found:boolean=false;
  plan = new FormGroup({
    Id: new FormControl('0'),
    Perspective: new FormControl(''),
    CorporateObjective: new FormControl(''),
    WorkUnitObjective: new FormControl(''),
    IndividualObjective: new FormControl(''),
    Weight: new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(2),
    ]),
    Measurement: new FormControl(''),
    EXP: new FormControl(''),
    FS: new FormControl(''),
    PS: new FormControl(''),
    UP: new FormControl(''),
    PerformancePeriod: new FormControl('')
  });

  employeeList: any = [];
  displayedColumns: string[] = ['Name', 'action'];
  displayColumns: string[] = ['No', 'Perspective', 'CorporateObjective', 'WorkUnitObjective', 'IndividualObjectives', 'Weight', 'Measurement', 'EXP', 'FS', 'PS', 'UP', 'delete', 'edit'];
  plandata: any = [];
  empId: any = [];
  userId: any = [];
  Name: any = [];
  onSearchClear() {
    this.searchKeyValue = "";
  }

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        this.PopulateControl();

      }
      else {
        this.rot.navigate(['/login']);
      }
    });
  }
  setValue(e: any) {
    if (e.checked) {
      this.self = true;
      this.found=true;
      this.PopulatePlan(this.userId, '');

    }
    else {
      this.self = false;
      this.found=false;
    }
  }
  PopulateControl() {
    this.plan = new FormGroup({
      Id: new FormControl('0'),
      Perspective: new FormControl(''),
      CorporateObjective: new FormControl(''),
      WorkUnitObjective: new FormControl(''),
      IndividualObjective: new FormControl(''),
      Weight: new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(2),
      ]),
      Measurement: new FormControl(''),
      EXP: new FormControl(''),
      FS: new FormControl(''),
      PS: new FormControl(''),
      UP: new FormControl('')
    });
  }
  onSearch() {

    this.emp.getEmployeeFromAdByName(this.searchKeyValue).subscribe((result) => {
      if (result) {
        this.employeeList = result;
      }
    });
  }
  onClose() {

    this.searchKeyValue = "";
  }
  SelectEmployee(id: any) {

  }
  PopulatePlan(id: any, name: any) {
    if(this.self === true){
      this.employeeList = '';
      this.period = this.datePipe.transform(this.search.controls['start'].value, "MM/dd/yyyy") + '-' +
      this.datePipe.transform(this.search.controls['end'].value, "MM/dd/yyyy");
      this.empId = id;
      this.found=true;
      this.planSvc.getPlanByEmpId(this.empId, this.period, this.userId).subscribe((result) => {
        if (result) {
          this.plandata = result;
          this.Name = name;
        }
      });
    }
    else{
      this.map.getEmployeeMapping(id, this.userId).subscribe((result: any) => {
        if (result.length > 0) {
          this.employeeList = '';
          this.empId = id;
          this.found=true;
          this.planSvc.getPlanByEmpId(this.empId, this.period, this.userId).subscribe((result) => {
            if (result) {
              this.plandata = result;
              this.Name = name;
            }
          });
        }
        else {
          this.found=false;
          this.notification.Failed('You are not allowed to Fill Annual Plan for this Employee.');
        }
      })
    }
    

  }
  SavePlan() {
    var x=this.plan.controls["Weight"].value;
    var y:number=+x;
    if ( y <= 100) {
      if (this.plan.controls["Id"].value != 0 && this.plan.controls["Id"].value != null) {
        this.planSvc.updatePlanById(this.plan.controls["Id"].value, this.userId, this.plan.value).subscribe((result: any) => {
          if (result) {
            this.notification.success("Successfully Updated");
            this.PopulatePlan(this.empId, this.Name);
            this.ngOnInit();
            this.PopulateControl();
          }
          else {
            this.notification.Failed("Failed to Update Plan");
          }
        });
      }
      else {
        if (this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy") != null &&
        this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy") != null)
        {
          this.period=this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy") +'-'+
          this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy");
          this.planSvc.savePlan(this.empId, this.userId, this.period, this.plan.value).subscribe((result) => {
            if (result) {
              this.notification.success(result.toString());
              this.ngOnInit();
              this.PopulatePlan(this.empId, this.Name);
              this.PopulateControl();
            }
            else {
              this.notification.Failed("Failed to Save Objective");
            }
          });
        }
       
      }
    }
    else {
      this.notification.Failed("Please Check Weight entry");
    }
  }
  Update(id: any) {
    this.planSvc.getPlanById(id).subscribe((result: any) => {
      this.plan = new FormGroup({
        Id: new FormControl(result[0].Id),
        Perspective: new FormControl(result[0].Perspective),
        CorporateObjective: new FormControl(result[0].CorporateObjective),
        WorkUnitObjective: new FormControl(result[0].WorkUnitObjective),
        IndividualObjective: new FormControl(result[0].IndividualObjective),
        Weight: new FormControl(result[0].Weight,[
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(2),
        ]),
        Measurement: new FormControl(result[0].Measurement),
        EXP: new FormControl(result[0].EXP),
        FS: new FormControl(result[0].FS),
        PS: new FormControl(result[0].PS),
        UP: new FormControl(result[0].UP),
        PerformancePeriod: new FormControl('')
      });
    });
  }
  Delete(id: any) {
    this.dialogsvc.openConfirmDialog('Are you sure to delete this record?').afterClosed().subscribe(data => {
      if (data) {
        this.planSvc.deletPlan(id).subscribe((result: any) => {

          if (result) {
            this.notification.Warn("Successfully Delete");
            this.ngOnInit();
            this.PopulatePlan(this.empId, this.Name);
          }
          else {
            this.notification.Failed("Failed to Delete plan");
          }

        });
      }
    });
  }
}
