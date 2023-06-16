import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { PrintallComponent } from '../printall/printall.component';

@Component({
  selector: 'app-my-apa',
  templateUrl: './my-apa.component.html',
  styleUrls: ['./my-apa.component.scss']
})
export class MyApaComponent implements OnInit {

  constructor(private loginSvc: LoginService, private rot: Router, private crSvc: CoreService, private empSvc: EmployeeService,
    private objSvc: ObjectiveService,   private dialog: MatDialog, private datePipe: DatePipe,
    private compSvc: CompetencyService, private rptSvc: RatingService) { }
    search = new FormGroup({
      start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
    });
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
  EmployeeComment:any=[];
  FirstLineComment: any = [];
  SecondLineComment: any = [];
  FirstLevelRate:any=0;
  SecondLevelRate:any=0;
  ThirdLevelRate:any=0;
  displayObjective: string[] = ['No', 'Objective', 'Rating'];
  displayCore: string[] = ['No', 'Core', 'Self-Rating', 'Rating'];
  displayedSuperColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedNonColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedRating: string[] = ['FirstLineRating', 'SecondLineRating'];
    period: string="";
  onSearch() {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.empId = result;
        if(this.search.controls['start'] && this.search.controls['end'])
        {
          this.period=this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy") + '-' +
          this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy");
          this.PopulateObjective(this.empId, this.period );
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
        this.empId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });

  }




  PopulateObjective(id: any, period:any) {
    this.empId = id;
    this.supervisory = 0;
    this.nonsupervisory = 0;
    this.core = 0;
    this.objective = 0;
    this.FirstLineComment = "";
    this.objSvc.getEmployeeApa(id, period).subscribe((result: any) => {

      if (result) {
        this.objectiveData = result;
        for (let i = 0; i < this.objectiveData.length; i = i + 1) {
          this.objective = this.objective + (result[i].Rating)
        }
        this.objective = Math.round((this.objective / result.length) * (0.7) * 100) / 100;

      }
    });

    this.empSvc.IsSupervisory(id, period).subscribe((result: any) => {
      if (result) {
        this.isSupervisor = result[0].IsSupervisor;
      }
    });
    this.PopulateCore(this.empId, period);
    this.PopulateNonCompetency(this.empId, period);
    this.PopulateSuperCompetency(this.empId, period);
    this.PopulateComment(this.empId, period);
    this.PopulateInitialRate(this.empId, period);
  }
  PopulateCore(id: any, period: any) {
    this.crSvc.getEmployeeCore(id, period).subscribe((result: any) => {
      this.core = 0;
      if (result) {
        this.coreData = result;

        for (let i = 0; i < result.length; i++) {
          this.core = this.core + result[i].EvaluatorRating;
        }
        this.core = Math.round((this.core / result.length) * (0.1) * 100) / 100;


      }
    });
  }
  PopulateNonCompetency(id: any, period: any) {
    this.compSvc.getNonSuperCompetency(id, period).subscribe((result: any) => {
      this.nonsupervisory = 0;
      if (result) {
        this.noncompetencyData = result;

        for (let i = 0; i < result.length; i++) {
          this.nonsupervisory = this.nonsupervisory + result[i].Rating;
        }
        this.nonsupervisory = Math.round((this.nonsupervisory / result.length) * (0.2) * 100) / 100;

      }

    });

  }
  PopulateSuperCompetency(id: any, period: any) {
    this.compSvc.getSuperCompetency(id, period).subscribe((result: any) => {
      this.supervisory = 0;
      if (result) {
        this.supercompetencyData = result;
        this.supervisory = 0;
        for (let i = 0; i < result.length; i++) {
          this.supervisory = this.supervisory + result[i].Rating;
        }
        this.supervisory = Math.round((this.supervisory / result.length) * (0.2) * 100) / 100;

      }
    });


  }

  PopulateComment(id: any, period: any) {
    this.EmployeeComment=[];
        this.FirstLineComment =[];
        this.SecondLineComment=[];
    this.objSvc.getComment(id, period).subscribe((result: any) => {
      if (result) {
        this.EmployeeComment=result[0].EmployeeComment;
        this.FirstLineComment = result[0].FirstLineManagerComment;
        this.SecondLineComment=result[0].SecondLineManager;
      }
    });
  }
  PopulateInitialRate(id: any, period: any) {
    this.FirstLevelRate=0;
        this.SecondLevelRate=0;
        this.ThirdLevelRate=0;
    this.rptSvc.getRating(id, period).subscribe((result:any) => {
      if (result) {
        this.FirstLevelRate=result[0].FirstLevelRate;
        this.SecondLevelRate=result[0].SecondLevelRate;
        this.ThirdLevelRate=result[0].ThirdLevelRate;
      }
    });
  }
  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "35%";
    config.data = [{empId:this.empId, period:this.period}];
    this.dialog.open(PrintallComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }

    });

  }

}
