import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/Services/department.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { PlanService } from 'src/app/Services/plan.service';

@Component({
  selector: 'app-annual-plan-expected',
  templateUrl: './annual-plan-expected.component.html',
  styleUrls: ['./annual-plan-expected.component.scss']
})
export class AnnualPlanExpectedComponent implements OnInit {

  constructor(private rot: Router, private notification: NotificationService,
    private dptSvc: DepartmentService, private planSvc: PlanService, private loginSvc: LoginService,private dialogsvc:DialogService) { }
  search = new FormGroup({
    Id: new FormControl('0'),
    Department: new FormControl(''),
    Expected: new FormControl('')
  });
  displayedColumns: any = ['No',  'Department', 'Expected', 'delete', 'edit'];
  
  department: any = [];
  planData: any = [];
  userId: any;

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
    this.PopulateDepartment();
    this.PopulateStatus();
  }
  PopulateStatus() {
    this.planSvc.getExpectedPlan().subscribe((result) => {
      if (result) {
        this.planData = result;
      }
    });
  }
  PopulateDepartment() {
    this.dptSvc.getDepartments().subscribe((result) => {
      this.department = result;
    });
  }
  SavePlanStatus(){
    if (this.search.controls["Id"].value!=0 && this.search.controls["Id"].value!=null) {
      this.planSvc.updateExpected(this.search.controls["Id"].value,this.userId, this.search.value).subscribe(result => {
        if (result) {
          this.notification.success("Successfully Updated");
          
          this.ngOnInit();
        }
        else {
          this.notification.Failed("Failed to Update");
          
          this.ngOnInit();
        }
      });
    }
    else {
      
        this.planSvc.saveExpected(this.userId, this.search.value).subscribe((result) => {
          if (result) {
            this.notification.success("Successfully Added");
            
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Save");
            
            this.ngOnInit();
          }
        });
      }

    
  }
  Delete(id: any) {
    this.dialogsvc.openConfirmDialog('Are you sure to delete this record?').afterClosed().subscribe(data => {
      if (data) {
        this.planSvc.deleteExpected(id).subscribe(result => {
          if (result) {
            this.notification.success("Successfully Deleted");
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Delete");
            this.ngOnInit();
          }
        });
      }
    });
  }

  Update(id: any) {
      this.planSvc.getExpectedPlanById(id).subscribe((result: any) => {
        this.search = new FormGroup({
          Id: new FormControl(result[0].Id),
          Location: new FormControl(result[0].Location),
          Department: new FormControl(result[0].Department),
          Division: new FormControl(result[0].Division),
          Expected: new FormControl(result[0].Expected)
        });
        this.PopulateDepartment();
      });
    }
}
