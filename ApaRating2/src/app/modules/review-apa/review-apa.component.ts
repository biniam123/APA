import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApaRatingService } from 'src/app/Services/apa-rating.service';
import { CompetencyService } from 'src/app/Services/competency.service';
import { CoreService } from 'src/app/Services/core.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ObjectiveService } from 'src/app/Services/objective.service';
import { RatingService } from 'src/app/Services/rating.service';
import { SupervisorService } from 'src/app/Services/supervisor.service';
import { jsPDF } from 'jspdf';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrintApaComponent } from '../print-apa/print-apa.component';
import { DialogService } from 'src/app/Services/dialog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-apa',
  templateUrl: './review-apa.component.html',
  styleUrls: ['./review-apa.component.scss']
})
export class ReviewAPAComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(private loginSvc: LoginService, private rot: Router, private crSvc: CoreService, private empSvc: EmployeeService,
    private objSvc: ObjectiveService, private rtsvc: ApaRatingService, private notification: NotificationService, private sup: SupervisorService,
    private compSvc: CompetencyService, private rptSvc: RatingService, private dialog: MatDialog, private dialogSvc: DialogService,
    private router: ActivatedRoute, private datePipe:DatePipe) { }
    period:string=new Date('07/01/'+(new Date().getFullYear()-1))+'-'+ new Date('06/30/'+(new Date().getFullYear()));
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
  Rate: any = 0;
  isLoading: boolean = false;
  FirstLevelRate: Number = 0;
  EmployeeComment: string = '';
  isFinalized: Boolean = false;
  displayedColumns: string[] = ['No', 'Name', 'Status', 'Plan', 'action', 'Print'];
  displayObjective: string[] = ['No', 'Objective', 'Rating', 'edit'];
  displayCore: string[] = ['No', 'Core', 'Self-Rating', 'Rating'];
  displayedSuperColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedNonColumns: string[] = ['No', 'Competency', 'Rating'];

  addComment = new FormGroup({
    FirstLineManagerComment: new FormControl('')
  });
  initialRatingData = new FormGroup({
    SecondSupervisor: new FormControl(''),
    SupervisorTitle: new FormControl(''),
    InitialRating: new FormControl(''),
    PerformancePeriod: new FormControl('')
  });
  search = new FormGroup({
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
  end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });

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

  onSearch() {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.empId = result;
        if(this.search.controls['start'] && this.search.controls['end'])
        {
          this.period=this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy") + '-' +
          this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy")
          this.PopulateEmployeeList(this.period);
          this.PopualateRating();
          this.PopulateSecondSupervisor();
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
    this.Clear();
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
    this.initialRatingData.reset({});
    this.search = new FormGroup({
      start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
  end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
    });
    this.period = "";
  }
  PopulateSecondSupervisor() {
    this.sup.getSecondLineSupervisor().subscribe((result) => {
      if (result) {
        this.secondSupervisors = result;
      }

    });
  }
  PopulateJobTitle() {
    if (this.initialRatingData.controls["SecondSupervisor"]) {
      this.sup.getSecondJobTitle(this.initialRatingData.controls["SecondSupervisor"].value).subscribe((result: any) => {
        if (result) {

          this.jobs = result;
          this.Rate = 0;
          this.initialRate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
          this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;

        }

      });
    }
  }

  PopulateEmployeeList(period:any) {
    this.objSvc.getEmployeeObjective(this.userId, period).subscribe((result) => {
      if (result) {
        this.employeeList = result;

      }
    });
  }
  openDialog(id: any) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "35%";
    config.data = [{id: id, period:this.period}];
    this.dialog.open(PrintApaComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }

    });

  }

  GetValue(rate: any, coreId: any) {
    for (let x = 0; x < this.crdata.length; x = x + 1) {

      if (coreId == this.crdata[x][0].Id) {
        this.crdata[x][0].Rating = rate;
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
        this.ncdata[x].PerformancePeriod=this.period;
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
    this.isFinalized = false;
    this.IsFinallized(id);
    this.initialRatingData = new FormGroup({
      SecondSupervisor: new FormControl(''),
      SupervisorTitle: new FormControl(''),
      InitialRating: new FormControl(''),
      PerformancePeriod:new FormControl(this.period)
    })
    this.objSvc.getEmployeeApa(id, this.period).subscribe((result: any) => {

      if (result) {
        if (this.isFinalized === true) {
          this.dialogSvc.openConfirmDialog('This Employee APA Record was Completed. If you want to change some evaluation contact HROD employees').afterClosed().subscribe(data => {
            if (data) { }

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
        this.Rate = 0;
        this.objective = Math.round((this.objective / result.length) * (0.7) * 100) / 100;

        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
        this.PopulateCore(this.empId);
        this.PopulateNonCompetency(this.empId);
        this.PopulateSuperCompetency(this.empId);
        this.PopulateComment(this.empId);
        this.PopualateInitialRating(this.empId);
      }
    });

    this.empSvc.IsSupervisory(id, this.period).subscribe((result: any) => {
      if (result) {
        this.isSupervisor = result[0].IsSupervisor;
      }
    });
  }
  IsFinallized(id: any) {
    this.rptSvc.IsSecondLineApprove(id, this.period).subscribe((result: any) => {
      if (result) {
        this.isFinalized = result[0].IsApproved;
      }

    });
  }
  
  EditObjective(id:any) {
    this.rot.navigate(['/editObjective', id, this.period]);
    //this.rot.navigate(['/editObjective/'+id+"&pe"]);
  }
  PopulateCore(id: any) {
    this.crSvc.getEmployeeCore(id, this.period).subscribe((result: any) => {
      this.core = 0;
      if (result) {
        this.coreData = result;

        for (let i = 0; i < result.length; i++) {
          this.core = this.core + result[i].EvaluatorRating;
        }
        this.Rate = 0;
        this.core = Math.round((this.core / result.length) * (0.1) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
      }
    });
  }
  PopulateNonCompetency(id: any) {

    this.compSvc.getNonSupervisoryCompetency(id,this.period, this.userId).subscribe((result: any) => {
      this.nonsupervisory = 0;
      if (result) {
        this.noncompetencyData = result;

        for (let i = 0; i < result.length; i++) {
          this.nonsupervisory = this.nonsupervisory + result[i].Rating;
        }
        this.Rate = 0;
        this.nonsupervisory = Math.round((this.nonsupervisory / result.length) * (0.2) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
      }

    });

  }
  PopulateSuperCompetency(id: any) {
    this.compSvc.getSupervisoryCompetency(id,this.period,  this.userId).subscribe((result: any) => {
      this.supervisory = 0;

      if (result) {
        this.supercompetencyData = result;
        this.supervisory = 0;
        for (let i = 0; i < result.length; i++) {
          this.supervisory = this.supervisory + result[i].Rating;
        }
        this.supervisory = Math.round((this.supervisory / result.length) * (0.2) * 100) / 100;
        this.Rate = 0;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 100) / 100;
      }
    });


  }
  PopualateInitialRating(empId: any) {
    this.initialRatingData.reset({});
    this.initialRatingData = new FormGroup({
      SecondSupervisor: new FormControl(''),
      SupervisorTitle: new FormControl(''),
      InitialRating: new FormControl(''),
      PerformancePeriod:new FormControl(this.period)
    });
    this.rptSvc.getRating(empId, this.period).subscribe((result: any) => {
      if (result) {
        if (result.length > 0) {
          this.initialRatingData = new FormGroup({
            SecondSupervisor: new FormControl(''),
            SupervisorTitle: new FormControl(''),
            InitialRating: new FormControl(result[0].FirstLevelRate),
            PerformancePeriod:new FormControl(result[0].PerformancePeriod)
          })

        }


      }
    });
  }
  PopulateComment(id: any) {
    this.EmployeeComment = '';
    this.objSvc.getComment(id, this.period).subscribe((result: any) => {
      if (result) {
        if (result.length > 0) {
          this.EmployeeComment = result[0].EmployeeComment;
          this.addComment = new FormGroup({
            FirstLineManagerComment: new FormControl(result[0].FirstLineManagerComment)
          });
        }

      }
    });
  }
  //i changed to then
  SaveRating() {
    var found = false;
    for (let i = 0; i < this.crdata.length; i = i + 1) {
      if (this.crdata[i][0].Rating === 0 && this.objectiveData[i].Rating === null) {
        this.notification.Failed("Please Evaluate all objective");
        found = true;
        break;
      }
    }
    if (found === false) {
      for (let i = 0; i < this.crdata.length; i = i + 1) {
        this.objSvc.SaveRating(this.userId, this.crdata[i]).then((result) => {
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
  }
  SaveEmpRating() {
    if (this.cdata) {
      var found = false;
      for (let i = 0; i < this.cdata.length; i = i + 1) {
        if (this.cdata[i].Rating === 0 && this.coreData[i].EvaluatorRating === null) {
          this.notification.Failed("Please Evaluate all Core");
          found = true;
          break;
        }
      }
      if (found === false) {

        this.crSvc.SaveEmpCore(this.empId, this.cdata, this.userId).subscribe((result) => {
          if (result) {
            this.notification.success("Successfully Added");
            this.PopulateObjective(this.empId, this.Name);
          }
          else {
            this.notification.Failed("Failed to Save Core");
          }
        });
      }
    }
  }
  addSuperCompetency() {
    if (this.scdata) {

      var found = false;
      for (let i = 0; i < this.scdata.length; i = i + 1) {
        if (this.scdata[i].Rating === 0 && this.supercompetencyData[i].Rating === null) {
          this.notification.Failed("Please Evaluate all Competency");
          found = true;
          break;
        }
      }
      if (found === false) {
        this.compSvc.SaveCompetency(this.empId, this.scdata, this.userId, 1).subscribe((result) => {
          if (result) {
            this.notification.success("Successfully Added");
            this.PopulateObjective(this.empId, this.Name);
          }
          else {
            this.notification.Failed("Failed to Save Competency");
          }
        });
      }
    }
  }
  addNonCompetency() {
    if (this.ncdata) {
      var found = false;
      for (let i = 0; i < this.ncdata.length; i = i + 1) {
        if (this.ncdata[i].Rating === 0 && this.noncompetencyData[i].Rating === null) {
          this.notification.Failed("Please Evaluate all Competency");
          found = true;
          break;
        }
      }
      if (found === false) {
        this.compSvc.SaveCompetency(this.empId, this.ncdata, this.userId, 2).subscribe((result) => {
          if (result) {
            this.notification.success("Successfully Added");
            this.PopulateObjective(this.empId, this.Name);
          }
          else {
            this.notification.Failed("Failed to Save Competency");
          }
        });
      }
    }
  }
  SaveComment() {
    if (this.addComment.valid) {
      this.objSvc.SaveManagerComment(this.empId, this.userId, this.addComment.controls["FirstLineManagerComment"].value).subscribe((result: any) => {
        if (result) {
          this.notification.success("Successfully Added");
          this.PopulateObjective(this.empId, this.Name);
        }
        else {
          this.notification.Failed("Failed to Save Comment");
        }
      });
    }
  }

  SaveInitialRating() {
    if (this.initialRatingData.valid) {
      if (this.initialRatingData.controls["InitialRating"].value == this.Rate) {

        if (this.initialRatingData.controls["InitialRating"].value >= 3.5) {
          this.isLoading = true;
          this.dialogSvc.openExceptionalDialog(this.empId, this.period).afterClosed().subscribe(data => {
            if (data) {
              if (this.initialRatingData.valid) {
                this.initialRatingData.controls['PerformancePeriod'].setValue(this.period);
                this.rptSvc.SaveFirstRating(this.empId, this.userId, this.initialRatingData.value).subscribe((rt) => {
                  if (rt) {

                    this.ngOnInit();
                    this.notification.success("Successfully Sent");
                    this.isLoading = false;
                  }
                  else {
                    this.notification.Failed("Failed To Send");
                    this.isLoading = false;
                  }
                });
              }
            }
          });
        }
        else {
          if (this.initialRatingData.valid) {
            this.isLoading = true;
            this.rptSvc.SaveFirstRating(this.empId, this.userId, this.initialRatingData.value).subscribe((rt) => {
              if (rt) {


                this.ngOnInit();
                this.notification.success("Successfully Sent");
                this.isLoading = false;
              }
              else {
                this.notification.Failed("Failed To Send");
                this.isLoading = false;
              }

            });
          }
        }

      }
      else {
        this.notification.Failed("Your Rating and System Calculated Amount doesn't match. Please re-check your entry or re-select the employee until its correct.");
      }
    }
  }
}
