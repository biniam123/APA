import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApaRatingService } from 'src/app/Services/apa-rating.service';
import { CompetencyService } from 'src/app/Services/competency.service';
import { CoreService } from 'src/app/Services/core.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ObjectiveService } from 'src/app/Services/objective.service';
import { RatingService } from 'src/app/Services/rating.service';
import { SupervisorService } from 'src/app/Services/supervisor.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-supervisorypositions',
  templateUrl: './supervisorypositions.component.html',
  styleUrls: ['./supervisorypositions.component.scss']
})
export class SUPERVISORYPOSITIONSComponent implements OnInit {

  constructor(private loginSvc: LoginService, private rot: Router, private crSvc: CoreService, private empSvc: EmployeeService,
    private objSvc: ObjectiveService, private rtsvc: ApaRatingService, private notification: NotificationService, private sup: SupervisorService,
    private compSvc: CompetencyService, private rptSvc: RatingService, private dialogSvc: DialogService, private router: ActivatedRoute, private datePipe: DatePipe) { }
  employeeList: any = [];
  userId: any;
  empId: any;
  objectiveData: any = [];
  ratings: any = [];
  Name: string = "";
  crdata: any = [];
  coreData: any = [];
  supercompetencyData: any = [];
  noncompetencyData: any = [];
  isSupervisor: any;
  objective: any = 0;
  core: any = 0;
  supervisory: any = 0;
  nonsupervisory: any = 0;
  secondSupervisors: any = [];
  jobs: any = [];
  initialRate: any = 0;
  id: any=0;
  Rate: any = 0;
  FirstRate: any = 0;
  isLoading: boolean = false;
  isFinalized:boolean=false;
  FirstLevelRate: Number = 0;
  EmployeeComment: string = '';
  displayedColumns: string[] = ['No', 'Name', 'Status','Plan', 'exception', 'action'];
  displayObjective: string[] = ['No', 'Objective', 'Rating'];
  displayCore: string[] = ['No', 'Core', 'Self-Rating', 'Rating'];
  displayedSuperColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedNonColumns: string[] = ['No', 'Competency', 'Rating'];
  FirstLineComment: string = '';
  addComment = new FormGroup({
    SecondLineManagerComment: new FormControl('')
  });
  period:string="";
  search = new FormGroup({
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });
  year: any = environment.ethiopianYear;
  cdata: any = [{ Id: 1, Rating: 0, PerformancePeriod: this.period },
  { Id: 2, Rating: 0, PerformancePeriod: this.period },
  { Id: 3, Rating: 0, PerformancePeriod: this.period },
  { Id: 4, Rating: 0, PerformancePeriod: this.period },
  { Id: 5, Rating: 0, PerformancePeriod: this.period },
  { Id: 6, Rating: 0, PerformancePeriod: this.period },
  { Id: 7, Rating: 0, PerformancePeriod: this.period },
  { Id: 8, Rating: 0, PerformancePeriod: this.period }
  ];
  ncdata: any = [{ Id: 1, Rating: 0, PerformancePeriod: this.period },
  { Id: 2, Rating: 0, PerformancePeriod: this.period },
  { Id: 3, Rating: 0, PerformancePeriod: this.period },
  { Id: 4, Rating: 0, PerformancePeriod: this.period },
  { Id: 5, Rating: 0, PerformancePeriod: this.period }];
  scdata: any = [{ Id: 1, Rating: 0, PerformancePeriod: this.period },
  { Id: 2, Rating: 0, PerformancePeriod: this.period },
  { Id: 3, Rating: 0, PerformancePeriod: this.period },
  { Id: 4, Rating: 0, PerformancePeriod: this.period },
  { Id: 5, Rating: 0, PerformancePeriod: this.period },
  { Id: 6, Rating: 0, PerformancePeriod: this.period },
  { Id: 7, Rating: 0, PerformancePeriod: this.period }];
  Rating = new FormGroup({
    FinalRate: new FormControl('')
  });
  onSearch() {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.empId = result;
        if(this.search.controls['start'] && this.search.controls['end'])
        {
          this.period=this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy") + '-' +
          this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy")
          this.Clear();
          this.PopulateEmployeeList();
        }
        
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
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
  }
  Clear() {
    this.employeeList = [];
    this.empId = "";
    this.objectiveData = [];
    this.Name = "";
    this.coreData = [];
    this.supercompetencyData = [];
    this.noncompetencyData = [];
    this.objective = 0;
    this.core = 0;
    this.supervisory = 0;
    this.nonsupervisory = 0;
    this.secondSupervisors = [];
    this.addComment.reset({});
  }


  PopulateEmployeeList() {
    this.objSvc.getRatedObjective(this.userId, this.period).then((result) => {
      if (result) {
        this.employeeList = result;
        this.PopualateRating();
      }
    });
  }



  GetValue(rate: any, coreId: any) {
    for (let x = 0; x < this.crdata.length; x = x + 1) {

      if (coreId == this.crdata[x][0].Id) {
        this.crdata[x][0].Rating = rate;
        this.crdata[x][0].PerformancePeriod = this.period;
        break;
      }
    }
  }
  GetCoreValue(rate: any, coreId: any) {
    for (let x = 0; x < this.cdata.length; x = x + 1) {

      if (coreId == this.cdata[x].Id) {
        this.cdata[x].Rating = rate;
        this.cdata[x].PerformancePeriod = this.period;
        break;
      }
    }
  }
  GetNonValue(rate: any, comId: any) {
    for (let x = 0; x < this.ncdata.length; x = x + 1) {

      if (comId == this.ncdata[x].Id) {
        this.ncdata[x].Rating = rate;
        this.ncdata[x].PerformancePeriod = this.period;
        break;
      }
    }
  }
  GetSuperValue(rate: any, comId: any) {
    for (let x = 0; x < this.scdata.length; x = x + 1) {

      if (comId == this.scdata[x].Id) {
        this.scdata[x].Rating = rate;
        this.scdata[x].PerformancePeriod=this.period;
        break;
      }
    }
  }
  PopualateRating() {
    this.rtsvc.getApaRatings().subscribe((result) => {
      this.ratings = result;
    })
  }
  PopulateObjective(id: any, name: any) {
    this.Name = name;
    this.empId = id;
    this.supervisory = 0;
    this.nonsupervisory = 0;
    this.core = 0;
    this.objective = 0;
    this.isLoading = false;
    this.isFinalized=false;
    this.IsFinallized(id);

    this.objSvc.getEmployeeApa(id ,this.period).subscribe((result: any) => {

      if (result) {
        if(this.isFinalized===true){
          this.dialogSvc.openConfirmDialog('This Employee APA Record was Completed. If you want to change some evaluation contact HROD employees').afterClosed().subscribe(data => {
            if (data) {}

        })
      }
        this.objectiveData = result;
        this.crdata = [];
        this.objective = 0;
        for (let i = 0; i < this.objectiveData.length; i = i + 1) {
          var temp = [{ Id: this.objectiveData[i].Id, Rating: 0 }];
          this.crdata.push(temp);
          this.objective = this.objective + (result[i].Rating)
        }
        this.initialRate = 0;
        this.id=0;
        this.objective = Math.round((this.objective / result.length) * (0.7) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.FirstRate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
        this.Rating.reset({});
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
        this.PopulateCore(this.empId);
        this.PopulateNonCompetency(this.empId);
        this.PopulateSuperCompetency(this.empId);
        this.PopulateComment(this.empId);
        this.PopulateInitialRate(this.empId);

      }
    });


    this.empSvc.IsSupervisory(id, this.period).subscribe((result: any) => {
      if (result) {
        this.isSupervisor = result[0].IsSupervisor;
      }
    });
  }
  IsFinallized(id:any){
    this.rptSvc.IsSecondLineApprove(id, this.period).subscribe((result:any) => {
      if(result){
        this.isFinalized = result[0].IsApproved;
      }
      
    });
  }
  PopulateInitialRate(id: any) {
    this.rptSvc.getRating(id, this.period).subscribe((result: any) => {
      if (result) {
        this.initialRate = result[0].FirstLevelRate;
        this.id=result[0].Id;
      }
    });
  }
  PopulateCore(id: any) {
    this.crSvc.getEmployeeCore(id, this.period).subscribe((result: any) => {
      this.core = 0;
      if (result) {
        this.coreData = result;

        for (let i = 0; i < result.length; i++) {
          this.core = this.core + result[i].EvaluatorRating;
        }
        this.core = Math.round((this.core / result.length) * (0.1) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.FirstRate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
        this.Rating.reset({});
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
      }
    });
  }
  PopulateNonCompetency(id: any) {

    this.compSvc.getNonSuperCompetency(id, this.period).subscribe((result: any) => {
      this.nonsupervisory = 0;
      if (result) {
        this.noncompetencyData = result;

        for (let i = 0; i < result.length; i++) {
          this.nonsupervisory = this.nonsupervisory + result[i].Rating;
        }
        this.nonsupervisory = Math.round((this.nonsupervisory / result.length) * (0.2) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.FirstRate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
        this.Rating.reset({});
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
      }

    });

  }
  PopulateSuperCompetency(id: any) {
    this.compSvc.getSuperCompetency(id, this.period).subscribe((result: any) => {
      this.supervisory = 0;

      if (result) {
        this.supercompetencyData = result;
        this.supervisory = 0;
        for (let i = 0; i < result.length; i++) {
          this.supervisory = this.supervisory + result[i].Rating;
        }
        this.supervisory = Math.round((this.supervisory / result.length) * (0.2) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.FirstRate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
        this.Rating.reset({});
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
      }
    });


  }


  //i changed to then
  SaveRating() {
    this.dialogSvc.openConfirmDialog('Any Change you have made on this record will be recorded by you. Are you sure to change this record?').afterClosed().subscribe(data => {
      if (data) {
        for (let i = 0; i < this.crdata.length; i = i + 1) {
          this.objSvc.SaveRating(this.userId, this.crdata[i]).then((result) => {
            if (result) {
              this.notification.success("Successfully Updated");
              this.PopulateObjective(this.empId, this.Name);
            }
            else {
              this.notification.Failed("Failed to Save Objective");
            }
          });
        }
      }
    });
  }
  SaveEmpRating() {
    this.dialogSvc.openConfirmDialog('Any Change you have made on this record will be recorded by you. Are you sure to change this record?').afterClosed().subscribe(data => {
      if (data) {
        if (this.cdata) {
          this.crSvc.SaveEmpCore(this.empId, this.cdata, this.userId).subscribe((result) => {
            if (result) {
              this.notification.success("Successfully Updated");
              this.PopulateObjective(this.empId, this.Name);
            }
            else {
              this.notification.Failed("Failed to Save Objective");
            }
          });
        }
      }
    });
  }
  addSuperCompetency() {
    this.dialogSvc.openConfirmDialog('Any Change you have made on this record will be recorded by you. Are you sure to change this record?').afterClosed().subscribe(data => {
      if (data) {
        if (this.scdata) {
          this.compSvc.SaveCompetency(this.empId, this.scdata, this.userId, 1).subscribe((result) => {
            if (result) {
              this.notification.success("Successfully Updated");
              this.PopulateObjective(this.empId, this.Name);
            }
            else {
              this.notification.Failed("Failed to Save Objective");
            }
          });
        }
      }
    });
  }
  addNonCompetency() {
    this.dialogSvc.openConfirmDialog('Any Change you have made on this record will be recorded by you. Are you sure to change this record?').afterClosed().subscribe(data => {
      if (data) {
        if (this.ncdata) {
          this.compSvc.SaveCompetency(this.empId, this.ncdata, this.userId, 2).subscribe((result) => {
            if (result) {
              this.notification.success("Successfully Updated");
              this.PopulateObjective(this.empId, this.Name);
            }
            else {
              this.notification.Failed("Failed to Save Objective");
            }
          });
        }
      }
    })
  }

  PopulateComment(id: any) {
    this.EmployeeComment = '';
    this.FirstLineComment = '';
    this.objSvc.getComment(id, this.period).subscribe((result: any) => {
      if (result) {
        this.EmployeeComment = result[0].EmployeeComment;
        this.FirstLineComment = result[0].FirstLineManagerComment;
        this.addComment = new FormGroup({
          SecondLineManagerComment: new FormControl(result[0].SecondLineManager)
        })
      }
    });
  }


  SaveComment() {
    if (this.addComment.valid) {
      this.objSvc.SaveSecongManagerComment(this.empId, this.userId, this.addComment.controls["SecondLineManagerComment"].value).subscribe((result: any) => {
        if (result) {
          this.notification.success("Successfully Added");
          this.PopulateObjective(this.empId, this.Name);
        }
        else {
          this.notification.Failed("Failed to Save Objective");
        }
      });
    }
  }

  AppoveRating() {
    if (this.Rating.valid) {
      this.isLoading = true;
      if (this.Rating.controls["FinalRate"].value == this.Rate) {
        if (this.Rating.controls["FinalRate"].value == 2 || this.Rating.controls["FinalRate"].value == 3) {
          this.objSvc.ApproveRating(this.empId, this.Rating.controls["FinalRate"].value,this.FirstRate, 4, this.period, this.userId).subscribe((result: any) => {
            if (result) {
                  this.empSvc.getUserNameById(this.empId).subscribe((to: any) => {
                    if (to) {
                      const toAddress: string = to.Name.toString() + "@ecx.com.et";
                      const subject: string = "Final APA Rating";
                      const tet: any = this.nonsupervisory + this.supervisory;
                      const body: string = "Dear " + this.Name + ", Your annual performance appraisal (APA) for the year "+this.year+" E.C has been reviewed and finalized by your second level supervisor. Accordingly final performance rating of " + this.Rating.controls["FinalRate"].value + " has been submitted to HR. Regards.";
                      this.empSvc.SendEmail(toAddress, subject, body).subscribe((res: any) => {
                        if (res == "OK") {
                          this.ngOnInit();
                          this.notification.success("Successfully Approved");
                          this.isLoading = false;
                        }
                        else {
                          this.notification.Failed("Failed To Approve");
                          this.isLoading = false;
                        }
                      });
                    }

                  });
                
              
            }
          });
        }
        else {
          this.objSvc.ApproveRating(this.empId, this.Rating.controls["FinalRate"].value,this.FirstRate, 3, this.period, this.userId).subscribe((result: any) => {
            if (result) {
              this.ngOnInit();
              this.notification.success("Successfully Approved");
              this.isLoading = false;
            }
            else {
              this.notification.Failed("Failed To Approve");
              this.isLoading = false;
            }
          })
        }
      }
      else {
        this.notification.Failed("Your Rating and System Calculated Amount doesn't match. Please re-check your entry.");
      }
    }
  }
}
