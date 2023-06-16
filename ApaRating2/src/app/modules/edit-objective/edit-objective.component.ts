import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ObjectiveService } from 'src/app/Services/objective.service';

@Component({
  selector: 'app-edit-objective',
  templateUrl: './edit-objective.component.html',
  styleUrls: ['./edit-objective.component.scss']
})
export class EditObjectiveComponent implements OnInit {

  constructor(private objsvc:ObjectiveService,private rot:Router,private act:ActivatedRoute,private notification:NotificationService,
    private loginSvc:LoginService, private dialogsvc:DialogService, private datePipe:DatePipe) { }
  addObjective = new FormGroup({
    Id: new FormControl(''),
    ObjectiveName: new FormControl(''),
    EmployeeId: new FormControl(''),
    CreatedBy: new FormControl('')
  });
  
  period:string=this.act.snapshot.params['period'];
  displayedColumns: string[] = ['No', 'Objective', 'delete', 'edit'];
  userId:any=[];
  objectiveData:any=[];
  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        this.PopulateObjective();
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
    
    
  }
  PopulateObjective() {
    this.objsvc.getEmployeeApa(this.act.snapshot.params['id'], this.period).subscribe((result) => {
        if (result)
          this.objectiveData = result;
      });
    
  }
  SaveObjective() {
    if (this.addObjective.controls["Id"].value) {
      this.objsvc.updateObjectiveData(this.addObjective.value, this.userId).subscribe((result: any) => {
        if (result) {
          this.notification.success("Successfully Updated");
          this.addObjective.reset({});
          this.ngOnInit();
        }
        else {
          this.notification.Failed("Failed to Update Objective");
        }
      });
    }
    else {
      if(this.addObjective.controls['ObjectiveName'].value){
        this.objsvc.saveObjectiveData(this.act.snapshot.params['id'], this.addObjective.controls['ObjectiveName'].value, this.period, this.userId).subscribe((result) => {
          if (result) {
            this.notification.success("Successfully Added");
            this.addObjective.reset({});
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Save Objective");
          }
        });
      }
      
    }
  }
  Delete(id: any) {
    this.dialogsvc.openConfirmDialog('Are you sure to delete this record?').afterClosed().subscribe(data => {
      if (data) {
        this.objsvc.deleteObjectiveData(id, this.userId).subscribe((result: any) => {

          if (result) {
            this.notification.Warn("Successfully Delete");
            this.addObjective.reset({});
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Delete Objective");
          }

        });
      }
    });
  }
  Update(id: any) {
    this.objsvc.getObjectiveById(id).subscribe((result: any) => {
      this.addObjective = new FormGroup({
        Id: new FormControl(result[0].Id),
        ObjectiveName: new FormControl(result[0].ObjectiveName),
        EmployeeId: new FormControl(result[0].EmployeeId),
      });
    });
  }
}
