import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApaRatingService } from 'src/app/Services/apa-rating.service';
import { CompetencyService } from 'src/app/Services/competency.service';
import { CoreService } from 'src/app/Services/core.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ObjectiveService } from 'src/app/Services/objective.service';
import { RatingService } from 'src/app/Services/rating.service';
import { jsPDF } from 'jspdf';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-printall',
  templateUrl: './printall.component.html',
  styleUrls: ['./printall.component.scss']
})
export class PrintallComponent implements OnInit {

  constructor( private crSvc: CoreService, private empSvc: EmployeeService,private dialogRef: MatDialogRef<PrintallComponent>,
    private objSvc: ObjectiveService, private router:ActivatedRoute,@Inject(MAT_DIALOG_DATA) data: any,
    private compSvc: CompetencyService, private rptSvc: RatingService) 
    {
      this.empId = data[0].empId;
      this.period = data[0].period; 
    }
    @ViewChild('content', { static: false }) el!: ElementRef;
  empId: any;
  period:string=new Date('07/01/'+(new Date().getFullYear()-1))+'-'+ new Date('06/30/'+(new Date().getFullYear()));
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
  Job: string = '';
  Period: string = '';
  ImmediateSupName: string = '';
  ImmediateSupTitle: string = '';
  SecondSupervisorName: string = '';
  SecondSupervisorJobTitle: string = '';
  Location: string = '';
  Department: string = '';
  Division: string = '';
  FirstRating: string = '';
  SecondRating: string = '';
  ThirdRating:string='';
  

  ngOnInit(): void {
    this.PopulateObjective();
    this.rptSvc.GetApprovedApa(this.empId, this.period).subscribe((result: any) => {
      if (result.length>0) {
        this.Name = result[0].EmployeeName;
        this.Job = result[0].JobTitle;
        this.Period = result[0].PerformancePeriod;
        this.ImmediateSupName = result[0].FirstLevelSupervisor;
        this.ImmediateSupTitle = result[0].FirstLineJobTitle;
        this.SecondSupervisorName = result[0].SecondLineSupervisorName;
        this.SecondSupervisorJobTitle = result[0].SecondLineJobTitle;
        this.Location = result[0].Location;
        this.Department = result[0].Department;
        this.Division = result[0].Division;
        this.FirstRating = result[0].FirstCode + '(' + result[0].FirstLevelRate + ')';
        this.SecondRating = result[0].SecondCode + '(' + result[0].SecondLevelRate + ')';
        if(result[0].ThirdCode!=null)
          this.ThirdRating=result[0].ThirdCode + '('+result[0].ThirdLevelRate+')';
      }
    });
    
  }




  PopulateObjective() {
    this.supervisory = 0;
    this.nonsupervisory = 0;
    this.core = 0;
    this.objective = 0;
    this.FirstLineComment = "";
    this.objSvc.getEmployeeApa(this.empId, this.period).subscribe((result: any) => {

      if (result) {
        this.objectiveData = result;
        for (let i = 0; i < this.objectiveData.length; i = i + 1) {
          this.objective = this.objective + (result[i].Rating)
        }
        this.objective = Math.round((this.objective / result.length) * (0.7) * 100) / 100;

      }
    });

    this.empSvc.IsSupervisory(this.empId, this.period).subscribe((result: any) => {
      if (result) {
        this.isSupervisor = result[0].IsSupervisor;
      }
    });
    this.PopulateCore();
    this.PopulateNonCompetency();
    this.PopulateSuperCompetency();
    this.PopulateComment();
    this.PopulateInitialRate();
  }
  PopulateCore() {
    this.crSvc.getEmployeeCore(this.empId, this.period).subscribe((result: any) => {
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
  PopulateNonCompetency() {
    this.compSvc.getNonSuperCompetency(this.empId, this.period).subscribe((result: any) => {
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
  PopulateSuperCompetency() {
    this.compSvc.getSuperCompetency(this.empId, this.period).subscribe((result: any) => {
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

  PopulateComment() {
    this.EmployeeComment=[];
        this.FirstLineComment =[];
        this.SecondLineComment=[];
    this.objSvc.getComment(this.empId, this.period).subscribe((result: any) => {
      if (result) {
        this.EmployeeComment=result[0].EmployeeComment;
        this.FirstLineComment = result[0].FirstLineManagerComment;
        this.SecondLineComment=result[0].SecondLineManager;
      }
    });
  }
  PopulateInitialRate() {
    this.FirstLevelRate=0;
        this.SecondLevelRate=0;
        this.ThirdLevelRate=0;
    this.rptSvc.getRating(this.empId, this.period).subscribe((result:any) => {
      if (result) {
        this.FirstLevelRate=result[0].FirstLevelRate;
        this.SecondLevelRate=result[0].SecondLevelRate;
        this.ThirdRating=result[0].ThirdLevelRate;
      }
    });
  }
  onClose() {

    this.dialogRef.close();
  }
  DownLoad() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      'width': 1335,
      callback: (pdf) => {
        pdf.save(this.Name+'.pdf');
      }
    });

  }

}
