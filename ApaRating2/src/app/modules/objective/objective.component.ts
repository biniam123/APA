import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DepartmentService } from 'src/app/Services/department.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { SupervisorService } from 'src/app/Services/supervisor.service';
import { LocationService } from 'src/app/Services/location.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectiveService } from 'src/app/Services/objective.service';
import { CoreService } from 'src/app/Services/core.service';
import { ApaRatingService } from 'src/app/Services/apa-rating.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { DivisionService } from 'src/app/Services/division.service';
import { LoginService } from 'src/app/Services/login.service';
import { RatingService } from 'src/app/Services/rating.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit {

  constructor(private dptSvc: DepartmentService, private empSvc: EmployeeService, private rtng: RatingService,
    private superSvc: SupervisorService, private lnsvc: LocationService, private objsvc: ObjectiveService,
    private dialogsvc: DialogService, private router: ActivatedRoute, private rot: Router, private coreSvc: CoreService,
    private rtsvc: ApaRatingService, private notification: NotificationService, private divSvc: DivisionService,
    private loginSvc: LoginService, private datePipe: DatePipe) { }

  addObjective = new FormGroup({
    Id: new FormControl(''),
    ObjectiveName: new FormControl(''),
    EmployeeId: new FormControl(''),
    CreatedBy: new FormControl('')
  });
period:string=this.datePipe.transform(this.router.snapshot.params['startDate'],"MM/dd/yyyy")+'-'+
this.datePipe.transform(this.router.snapshot.params['endDate'],"MM/dd/yyyy");
  addEmployee = new FormGroup({
    EmployeeName: new FormControl(''),
    JobTitle: new FormControl(''),
    start: new FormControl(new Date(this.router.snapshot.params['startDate'])),
    end: new FormControl(new Date(this.router.snapshot.params['endDate'])),
    Supervisor: new FormControl(''),
    ImmediateJobTitle: new FormControl(''),
    Location: new FormControl(''),
    Department: new FormControl(''),
    Division: new FormControl(''),
    IsSupervisory: new FormControl('')
  });
  addCore = new FormGroup({
    CoreValue: new FormControl(''),
    Id: new FormControl('')
  });
  addComment = new FormGroup({
    EmployeeComment: new FormControl('')
  });
  userId: any;
  CoreValue: any = [];
  objectiveData: any = [];
  supervisors: any = [];
  locations: any = [];
  department: any = [];
  divisions: any = [];
  coreData: any = [];
  ratings: any = [];
  job: any = [];
  imdJob: any = [];
  dept: any = [];
  email: string = "";
  isSupervisory: Boolean = false;
  isExist: any = false;
  isFinalized: Boolean = false;
  displayedColumns: string[] = ['No', 'Objective', 'delete', 'edit'];
  displayCore: string[] = ['No', 'Core', 'Rating'];

  crdata: any = [{ Id: 1, Rating: 0, PerformancePeriod: this.period },
  { Id: 2, Rating: 0, PerformancePeriod: this.period },
  { Id: 3, Rating: 0, PerformancePeriod: this.period },
  { Id: 4, Rating: 0, PerformancePeriod: this.period },
  { Id: 5, Rating: 0, PerformancePeriod: this.period },
  { Id: 6, Rating: 0, PerformancePeriod: this.period },
  { Id: 7, Rating: 0, PerformancePeriod: this.period },
  { Id: 8, Rating: 0, PerformancePeriod: this.period }];

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
    this.IsEmpExist();
    this.IsFinallized();
    this.PopulateLocation();
    this.PopulateDepartment();
    this.GetFirstLineSupervisor();
    this.PopulateObjective();
    this.PopulateCore();
    this.PopulateRating();
    this.PopulateJob();
    this.PopulateComment();

  }
  IsEmpExist() {
    if (this.router.snapshot.params['id']) {
        this.empSvc.getEmployeeByPeriod(this.router.snapshot.params['id'], this.period).subscribe((res: any) => {
            if (res) {
              this.addEmployee = new FormGroup({
                EmployeeId: new FormControl(res[0].EmployeeId),
                EmployeeName: new FormControl(res[0].EmployeeName),
                JobTitle: new FormControl(res[0].JobTitle),
                start: new FormControl(new Date(this.router.snapshot.params['startDate'])),
                end: new FormControl(new Date(this.router.snapshot.params['endDate'])),
                Supervisor: new FormControl(res[0].FirstLevelSupervisor),
                ImmediateJobTitle: new FormControl(res[0].FirstLineJobTitle),
                Location: new FormControl(res[0].Location),
                Department: new FormControl(res[0].Department),
                Division: new FormControl(res[0].Division)
              });

              this.PopulateSupJob();
              this.PopulateDivision();
            }
          });
          this.empSvc.IsExist(this.router.snapshot.params['id'], this.period).subscribe((result: any) => {
        if (result)
          this.isExist = result[0].Column1;
      });
    }
  }
  IsFinallized() {
    this.rtng.IsSecondLineApprove(this.router.snapshot.params['id'], this.period).subscribe((result: any) => {
      if (result) {
        this.isFinalized = result[0].IsApproved;
      }

    });
  }
  PopulateJob() {
    this.superSvc.getJobTitle().subscribe((result) => {
      this.job = result;
    });
  }

  PopulateRating() {
    this.rtsvc.getApaRatings().subscribe((result) => {
      this.ratings = result;
    })
  }
  PopulateCore() {
    this.coreSvc.getCore(this.router.snapshot.params['id'], this.period, this.userId).subscribe((result) => {
      this.coreData = result;

    });
  }

  GetValue(rate: any, coreId: any) {
    for (let x = 0; x < this.crdata.length; x = x + 1) {

      if (coreId == this.crdata[x].Id) {
        this.crdata[x].Rating = rate;
        break;
      }
    }
  }
  PopulateObjective() {
    if (this.router.snapshot.params['id']) {

      this.objsvc.getObjectiveByEmpId(this.router.snapshot.params['id'], this.userId, 
      this.period).subscribe((result:any) => {
        if (result.length>0){
          this.objectiveData = result;
          if(result[0].Status !=1){
            this.isFinalized=true;
          }
        }
          
      });
    }
  }
  PopulateSupJob() {
    if (this.addEmployee.controls["Supervisor"]) {
      this.superSvc.getFirstLineJob(this.addEmployee.controls["Supervisor"].value).subscribe((result) => {
        this.imdJob = result;
      });
    }
  }
  PopulateDivision() {
    if (this.addEmployee.controls["Department"]) {
      this.divSvc.getDivisionByDptId(this.addEmployee.controls["Department"].value).subscribe((result) => {
        this.divisions = result;
      });
    }
  }
  PopulateLocation() {
    this.lnsvc.getLocation().subscribe((result) => {
      this.locations = result;
    });
  }
  PopulateDepartment() {
    this.dptSvc.getDepartments().subscribe((result) => {
      this.department = result;
    });
  }

  GetFirstLineSupervisor() {
    this.superSvc.getFirstLineSupervisor().subscribe((result) => {
      this.supervisors = result;
    });
  }

  SaveProfile() {
    if (this.addEmployee.valid) {
      this.empSvc.SaveProfile(this.router.snapshot.params['id'], this.userId, this.addEmployee.value).subscribe((result) => {
        if (result) {
          this.notification.success("Successfully Registered");
          this.addEmployee.reset({});
          this.ngOnInit();
        }
        else {
          this.notification.Failed("Failed to Update Profile");
        }
      })
    }
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
        this.objsvc.saveObjectiveData(this.router.snapshot.params['id'], this.addObjective.controls['ObjectiveName'].value, this.period, this.userId).subscribe((result) => {
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
  SaveCoreData() {
    if (this.crdata) {
      var found = false;
      for (let i = 0; i < this.crdata.length; i = i + 1) {
        if (this.crdata[i].Rating === 0 && this.coreData[i].SelfRating === null) {
          this.notification.Failed("Please Evaluate all Core");
          found = true;
          break;
        }
      }
      if (found === false) {
        this.coreSvc.SaveCore(this.router.snapshot.params['id'], this.crdata, this.userId).subscribe((result) => {
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
  PopulateComment() {
    this.objsvc.getComment(this.router.snapshot.params['id'], this.period).subscribe((result: any) => {
      if (result.length > 0) {
        this.addComment = new FormGroup({
          EmployeeComment: new FormControl(result[0].EmployeeComment)
        });
      }
    });
  }
  SaveComment() {
    if (this.addComment.valid) {
      if (this.addComment.controls["EmployeeComment"].value != "") {
        this.objsvc.SaveComment(this.router.snapshot.params['id'], this.userId, this.addComment.controls["EmployeeComment"].value, this.period).subscribe((result: any) => {
          if (result) {
            this.notification.success("Successfully Submitted");
            this.addComment.reset({});
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Save Comment");
          }
        });
      }
      else {
        this.notification.success("Successfully Submitted");
        this.addComment.reset({});
        this.ngOnInit();
      }
    }
  }
}

