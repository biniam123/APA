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
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.scss']
})
export class DetailReportComponent implements OnInit {

  constructor(private loginSvc: LoginService, private rot: Router, private crSvc: CoreService, private empSvc: EmployeeService,
    private objSvc: ObjectiveService, private dialog: MatDialog, private datePipe: DatePipe,
    private compSvc: CompetencyService, private rptSvc: RatingService) { }

  searchKeyValue: string = "";
  search = new FormGroup({
    searchKey: new FormControl(''),
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });

 period: string ="";
  employeeList: any = [];


  onSearchClear() {
    this.searchKeyValue = "";
    this.search.reset({});
  }
  onSearch() {
    if(this.search.valid)
    {
      this.period = this.datePipe.transform(this.search.controls['start'].value, "MM/dd/yyyy") + '-' + 
      this.datePipe.transform(this.search.controls['end'].value, "MM/dd/yyyy");
      this.empSvc.getEmployee(this.search.controls['searchKey'].value, this.period).subscribe((result) => {
        if (result) {
          this.employeeList = result;
        }
      });
    }
    


  }
  onClose() {
    this.search.reset({});
    this.searchKeyValue = "";
  }
  empId: any;
  userId: any;
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
  EmployeeComment: string = '';
  FirstLineComment: string = '';
  SecondLineComment: string = '';
  FirstLevelRate: any = 0;
  SecondLevelRate: any = 0;
  ThirdLevelRate:any=0;
  employeeData: any = [];
  isLoading: boolean = false;

  displayedColumns: string[] = ['No', 'Name','exception', 'Print'];
  displayComment: string[] = ['FirstComment', 'SecondComment'];
  displayObjective: string[] = ['No', 'Objective', 'Rating'];
  displayCore: string[] = ['No', 'Core', 'Self-Rating', 'Rating'];
  displayedSuperColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedNonColumns: string[] = ['No', 'Competency', 'Rating'];
  displayedRating: string[] = ['FirstLineRating', 'SecondLineRating'];
  displayEmployee: string[] = ['Name', 'Job', 'Period', 'SupervisorName', 'SupervisorJob', 'Location', 'Department', 'Division'];


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
  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "35%";
    config.data = [{empId:this.empId, period: this.period}];
    this.dialog.open(PrintallComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }

    });

  }
  PopulateObjective(id: any, name: any, period:any) {
    this.empId = id;
    this.Name = name;
    this.empId = id;
    this.supervisory = 0;
    this.nonsupervisory = 0;
    this.core = 0;
    this.objective = 0;
    this.FirstLevelRate = 0;
    this.SecondLevelRate = 0;
    this.EmployeeComment = '';
    this.FirstLineComment = '';
    this.SecondLineComment = '';
    this.employeeData = '';
    this.objSvc.getEmployeeApa(id, period).subscribe((result: any) => {

      if (result) {
        this.objectiveData = result;
        for (let i = 0; i < this.objectiveData.length; i = i + 1) {
          this.objective = this.objective + (result[i].Rating)
        }
        this.objective = Math.round((this.objective / result.length) * (0.7) * 100) / 100;

      }
    });

    this.empSvc.IsSupervisory(id, this.period).subscribe((result: any) => {
      if (result) {
        this.isSupervisor = result[0].IsSupervisor;
      }
    });
    this.PopulateEmployee(this.empId, period);
    this.PopulateCore(this.empId);
    this.PopulateNonCompetency(this.empId);
    this.PopulateSuperCompetency(this.empId);
    this.PopulateComment(this.empId);
    this.PopulateInitialRate(this.empId);
  }
  PopulateEmployee(id: any, period: any) {
    this.empSvc.getEmployeeDetail(id, period).subscribe((res: any) => {
      if (res) {
        this.employeeData = res;
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

      }
    });


  }

  PopulateComment(id: any) {
    this.EmployeeComment = '';
    this.FirstLineComment = '';
    this.SecondLineComment = '';
    this.objSvc.getComment(id, this.period).subscribe((result: any) => {
      if (result.length > 0) {
        this.EmployeeComment = result[0].EmployeeComment;
        this.FirstLineComment = result[0].FirstLineManagerComment;
        this.SecondLineComment = result[0].SecondLineManager;
      }
    });
  }
  PopulateInitialRate(id: any) {
    this.rptSvc.getRating(id, this.period).subscribe((result: any) => {
      if (result) {
        this.FirstLevelRate = result[0].FirstLevelRate;
        this.SecondLevelRate = result[0].SecondLevelRate;
        this.ThirdLevelRate =result[0].ThirdLevelRate;
      
      }
    });
  }
  
}
