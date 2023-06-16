import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { CriateriaService } from 'src/app/Services/criateria.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { ExceptionObjectvieService } from 'src/app/Services/exception-objectvie.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ObjectiveService } from 'src/app/Services/objective.service';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})
export class ExceptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crSvc: CriateriaService, private loginSvc: LoginService,private dialogsvc:DialogService,
    public dialogRef: MatDialogRef<ExceptionComponent>, private rot: Router,private objSvc:ExceptionObjectvieService,private notification:NotificationService,
    private objsvc: ObjectiveService) { }
  displayedColumns: string[] = ['No', 'Objective', 'delete', 'edit'];
  displayedAllColumns: string[] = ['No', 'Objective'];
  period:string=new Date('07/01/'+(new Date().getFullYear()-1))+'-'+ new Date('06/30/'+(new Date().getFullYear()));
  addObjective = new FormGroup({
    Id: new FormControl(''),
    Objective: new FormControl(''),
    EmployeeId: new FormControl('')
  });
  addCriateria = new FormGroup({
    CoreValue: new FormControl(''),
    Dedication: new FormControl(''),
    Adherence: new FormControl(''),
    Shouldering: new FormControl(''),
    Skill: new FormControl(''),
    Innovative: new FormControl(''),
    Share: new FormControl(''),
    PerormancePeriod: new FormControl(this.period)
  });
  objectiveData: any = [];
  allObjectiveData: any = [];
  userId: any = [];
  empId:any=[];

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        if (this.data.id) {
          this.addCriateria = new FormGroup({
            CoreValue: new FormControl(''),
            Dedication: new FormControl(''),
            Adherence: new FormControl(''),
            Shouldering: new FormControl(''),
            Skill: new FormControl(''),
            Innovative: new FormControl(''),
            Share: new FormControl(''),
            PerormancePeriod: new FormControl(this.period)
          });
          this.period=this.data.period;
          this.empId=this.data.id;
          this.PopulateCriateria(this.empId, this.period);
          this.PopulateObjective(this.empId, this.period);
          this.PopulateAllObjective(this.empId, this.period);
        }

      }
      else {
        this.rot.navigate(['/login']);
      }
    });

  }
  PopulateAllObjective(id:any, period:any) {
    this.objsvc.getEmployeeApa(id, period).subscribe((result) => {
        if (result)
          this.allObjectiveData = result;
      });
    
  }
  PopulateObjective(id:any, period:any){
    
    this.objSvc.getExceptionObjectiveByEmpId(id, period).subscribe((result)=>{
      if(result){
        this.objectiveData=result;
      }
    })
  }
  SaveObjective() {
    if (this.addObjective.controls["Id"].value) {
      this.objSvc.updateExceptionObjectiveById(this.addObjective.controls["Id"].value, this.addObjective.controls["Objective"].value, 
      this.userId).subscribe((result: any) => {
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
      this.objSvc.saveExceptionObjectiveById(this.empId, this.addObjective.controls['Objective'].value, this.period, this.userId).subscribe((result) => {
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
  SaveCriateria() {
    if (this.addCriateria.valid) {
      this.crSvc.SaveCriateria(this.empId, this.userId, this.addCriateria.value, this.period).subscribe((result) => {
        this.ngOnInit();
      });
    }

  }
  PopulateCriateria(id: any, period: any) {
    this.crSvc.getCriateria(id, period).subscribe((result: any) => {
      if (result != null) {
        this.addCriateria = new FormGroup({
          CoreValue: new FormControl(result[0].CoreValue),
          Dedication: new FormControl(result[0].Dedication),
          Adherence: new FormControl(result[0].Adherence),
          Shouldering: new FormControl(result[0].Shouldering),
          Skill: new FormControl(result[0].Skill),
          Innovative: new FormControl(result[0].Innovative),
          Share: new FormControl(result[0].Share),
          PerformancePeriod: new FormControl(result[0].PerformancePeriod)
        });
      }
    });
  }
  Delete(id: any) {
    this.dialogsvc.openConfirmDialog('Are you sure to delete this record?').afterClosed().subscribe(data => {
      if (data) {
        this.objSvc.deleteExceptionObjectiveById(id).subscribe((result: any) => {

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
    this.objSvc.getExceptionObjectiveById(id).subscribe((result: any) => {
      this.addObjective = new FormGroup({
        Id: new FormControl(result[0].Id),
        Objective: new FormControl(result[0].Objective),
        EmployeeId: new FormControl(result[0].EmployeeId),
      });
    });
  }
  closeDialog() {

    this.dialogRef.close(false);
  }
}
