import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ApaRatingService } from 'src/app/Services/apa-rating.service';
import { CompetencyService } from 'src/app/Services/competency.service';
import { CriateriaService } from 'src/app/Services/criateria.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ExceptionObjectvieService } from 'src/app/Services/exception-objectvie.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { RatingService } from 'src/app/Services/rating.service';

@Component({
  selector: 'app-nonsupervisorypositions',
  templateUrl: './nonsupervisorypositions.component.html',
  styleUrls: ['./nonsupervisorypositions.component.scss']
})
export class NONSUPERVISORYPOSITIONSComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;
  constructor(private loginSvc: LoginService, private rot: Router, 
    private rtSvc: RatingService, private router: ActivatedRoute, private epnSvc: ExceptionObjectvieService, private cr: CriateriaService) { }
  userId: any = [];
  empId: any;
  Name: string = '';
  Job: string = '';
  performanceperiod: string = '';
  ImmediateSupName: string = '';
  ImmediateSupTitle: string = '';
  SecondSupervisorName: string = '';
  SecondSupervisorJobTitle: string = '';
  Location: string = '';
  Department: string = '';
  Division: string = '';
  objectiveData: any = [];
  core: any = [];
  Skill: any = [];
  Adherence: any = [];
  Share: any = [];
  Dedication: any = [];
  Shouldering: any = [];
  Innovative: any = [];


  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        this.empId = this.router.snapshot.params['id'];
        this.performanceperiod=this.router.snapshot.params['period'];
      }
      else {
        this.rot.navigate(['/login']);
      }
    });

    this.PopulateProfile();
    this.PopulateObjective();
    this.PopulateCriateria();
    
  }
  PopulateProfile() {
    this.rtSvc.GetApprovedApa(this.empId, this.performanceperiod).subscribe((result: any) => {
      if (result) {
        this.Name = result[0].EmployeeName;
        this.Job = result[0].JobTitle;
        this.performanceperiod = result[0].PerformancePeriod;
        this.ImmediateSupName = result[0].FirstLevelSupervisor;
        this.ImmediateSupTitle = result[0].FirstLineJobTitle;
        this.SecondSupervisorName = result[0].SecondLineSupervisorName;
        this.SecondSupervisorJobTitle = result[0].SecondLineJobTitle;
        this.Location = result[0].Location;
        this.Department = result[0].Department;
        this.Division = result[0].Division;

      }
    });
  }
  PopulateObjective() {
    this.epnSvc.getExceptionObjectiveByEmpId(this.empId, this.performanceperiod).subscribe((result: any) => {
      if (result) {
        this.objectiveData = result;
        this.Name = result[0].EmployeeName;
      }
    });
  }
  PopulateCriateria() {
    this.cr.getCriateria(this.empId, this.performanceperiod).subscribe((result:any) => {
      if (result) {
        this.core= result[0].CoreValue;
        this.Dedication= result[0].Dedication;
        this.Adherence= result[0].Adherence;
        this.Shouldering= result[0].Shouldering;
        this.Skill= result[0].Skill;
        this.Share= result[0].Share;
        this.Innovative= result[0].Innovative;
      }

    });
  }

  Download() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      'width': 1335,
      callback: (pdf) => {
        pdf.save(this.Name + ' Exceptional Objectives.pdf');
      }
    });

  }
}
