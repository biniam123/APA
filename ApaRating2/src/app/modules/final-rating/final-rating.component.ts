import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-final-rating',
  templateUrl: './final-rating.component.html',
  styleUrls: ['./final-rating.component.scss']
})
export class FinalRatingComponent implements OnInit {

  constructor(private loginSvc: LoginService, private rot: Router, private crSvc: CoreService, private empSvc: EmployeeService,
    private objSvc: ObjectiveService, private rtsvc: ApaRatingService, private notification: NotificationService, private sup: SupervisorService,
    private compSvc: CompetencyService, private rptSvc: RatingService,  private dialogSvc: DialogService) { }
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
  SecondRate:any=0;
  isLoading: boolean = false;
  FirstLevelRate: Number = 0;
  EmployeeComment: string = '';
  displayedColumns: string[] = ['No', 'Name', 'Status', 'first','second','third','exception','action'];
  displayObjective: string[] = ['No', 'Objective', 'Rating'];
  displayCore: string[] = ['No', 'Core', 'Self-Rating', 'Rating'];
  displayedSuperColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedNonColumns: string[] = ['No', 'Competency', 'Rating'];
  FirstLineComment:string='';
  SecondLineComment:string='';
  Rate:any=0;
  


  cdata: any = [{ Id: 1, Rating: 0 },
  { Id: 2, Rating: 0 },
  { Id: 3, Rating: 0 },
  { Id: 4, Rating: 0 },
  { Id: 5, Rating: 0 },
  { Id: 6, Rating: 0 },
  { Id: 7, Rating: 0 },
  { Id: 8, Rating: 0 }
  ];
  ncdata: any = [{ Id: 1, Rating: 0 },
  { Id: 2, Rating: 0 },
  { Id: 3, Rating: 0 },
  { Id: 4, Rating: 0 },
  { Id: 5, Rating: 0 }];
  scdata: any = [{ Id: 1, Rating: 0 },
  { Id: 2, Rating: 0 },
  { Id: 3, Rating: 0 },
  { Id: 4, Rating: 0 },
  { Id: 5, Rating: 0 },
  { Id: 6, Rating: 0 },
  { Id: 7, Rating: 0 }];
  Rating = new FormGroup({
    FinalRate: new FormControl('')
  });


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
    this.PopulateEmployeeList();
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
  }
  
  
  PopulateEmployeeList() {
    this.objSvc.getFinalObjectiveByEmpId(this.userId).subscribe((result) => {
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
        break;
      }
    }
  }
  GetCoreValue(rate: any, coreId: any) {
    for (let x = 0; x < this.cdata.length; x = x + 1) {

      if (coreId == this.cdata[x].Id) {
        this.cdata[x].Rating = rate;
        break;
      }
    }
  }
  GetNonValue(rate: any, comId: any) {
    for (let x = 0; x < this.ncdata.length; x = x + 1) {

      if (comId == this.ncdata[x].Id) {
        this.ncdata[x].Rating = rate;
        break;
      }
    }
  }
  GetSuperValue(rate: any, comId: any) {
    for (let x = 0; x < this.scdata.length; x = x + 1) {

      if (comId == this.scdata[x].Id) {
        this.scdata[x].Rating = rate;
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
    this.objSvc.getEmployeeApa(id, "").subscribe((result: any) => {

      if (result) {
        this.objectiveData = result;
        this.crdata = [];
        this.objective=0;
        for (let i = 0; i < this.objectiveData.length; i = i + 1) {
          var temp = [{ Id: this.objectiveData[i].Id, Rating: 0 }];
          this.crdata.push(temp);
          this.objective = this.objective + (result[i].Rating)
        }
        this.initialRate = 0;
        
        this.objective = Math.round((this.objective / result.length) * (0.7) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
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
    
  
    this.empSvc.IsSupervisory(id, "").subscribe((result: any) => {
      if (result) {
        this.isSupervisor = result[0].IsSupervisor;
      }
    });
  }

  PopulateInitialRate(id: any) {
      this.rptSvc.getRating(id, "").subscribe((result:any) => {
        if (result) {
          this.initialRate = result[0].FirstLevelRate;
          this.SecondRate=result[0].SecondLevelRate;
        }
      });
    }
  PopulateCore(id: any) {
    this.crSvc.getEmployeeCore(id,"").subscribe((result: any) => {
      this.core = 0;
      if (result) {
        this.coreData = result;

        for (let i = 0; i < result.length; i++) {
          this.core = this.core + result[i].EvaluatorRating;
        }
        this.core = Math.round((this.core / result.length) * (0.1) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
      }
    });
  }
  PopulateNonCompetency(id: any) {

    this.compSvc.getNonSuperCompetency(id, "").subscribe((result: any) => {
      this.nonsupervisory = 0;
      if (result) {
        this.noncompetencyData = result;

        for (let i = 0; i < result.length; i++) {
          this.nonsupervisory = this.nonsupervisory + result[i].Rating;
        }
        this.nonsupervisory = Math.round((this.nonsupervisory / result.length) * (0.2) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
      }

    });

  }
  PopulateSuperCompetency(id: any) {
    this.compSvc.getSuperCompetency(id, "").subscribe((result: any) => {
      this.supervisory = 0;

      if (result) {
        this.supercompetencyData = result;
        this.supervisory = 0;
        for (let i = 0; i < result.length; i++) {
          this.supervisory = this.supervisory + result[i].Rating;
        }
        this.supervisory = Math.round((this.supervisory / result.length) * (0.2) * 100) / 100;
        this.Rate = Math.round((this.objective + this.core + this.nonsupervisory + this.supervisory) * 1) / 1;
        this.Rating = new FormGroup({
          FinalRate: new FormControl(this.Rate)
        });
      }
    });


  }
  
  
  //i changed to then
  SaveRating() {
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
  SaveEmpRating() {
    if (this.cdata) {
      this.crSvc.SaveEmpCore(this.empId, this.cdata, this.userId).subscribe((result) => {
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
  addSuperCompetency() {
    if (this.scdata) {
      this.compSvc.SaveCompetency(this.empId, this.scdata, this.userId, 1).subscribe((result) => {
        if (result) {
          this.notification.success("Successfully Added");
          this.PopulateObjective(this.empId,this.Name);
        }
        else {
          this.notification.Failed("Failed to Save Objective");
        }
      });
    }
  }
  addNonCompetency() {
    if (this.ncdata) {
      this.compSvc.SaveCompetency(this.empId, this.ncdata, this.userId, 2).subscribe((result) => {
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
  

  
  PopulateComment(id: any) {
    this.EmployeeComment='';
        this.FirstLineComment = '';
    this.objSvc.getComment(id,"").subscribe((result: any) => {
      if (result) {
        this.EmployeeComment=result[0].EmployeeComment;
        this.FirstLineComment = result[0].FirstLineManagerComment;
        this.SecondLineComment=result[0].SecondLineManager;
      }
    });
  }


  

  AppoveRating() {
    if (this.Rating.valid) {
      this.isLoading = true;
      if (this.Rating.controls["FinalRate"].value == this.Rate) {
        this.objSvc.ConfirmRating(this.empId, this.Rating.controls["FinalRate"].value, this.userId).subscribe((result: any) => {
            if (result) {

             
                  this.empSvc.getUserNameById(this.empId).subscribe((to: any) => {
                    if (to) {

                      const toAddress: string = to.Name.toString() + "@ecx.com.et";
                      const subject: string = "3rd  level rating notification";
                      const tet: any = this.nonsupervisory + this.supervisory;
                      const body: string = "Dear " + this.Name + ", Your annual performance appraisal (APA) for the year 2014 E.C has been reviewed and calibrated by the Executive leadership team (ELT). Accordingly your calibrated final performance rating of "+this.Rating.controls["FinalRate"].value+" has been recorded. Regards,";
                      this.empSvc.SendEmail( toAddress, subject, body).subscribe((res: any) => {
                        if (res == "OK") {
                          this.FirstLevelRate=0;
                          this.SecondRate=0;
                          
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
        this.notification.Failed("Your Rating and System Calculated Amount doesn't match. Please re-check your entry.");
      }
    }
  }
}
