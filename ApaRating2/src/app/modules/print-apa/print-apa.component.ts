import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { RatingService } from 'src/app/Services/rating.service';

@Component({
  selector: 'app-print-apa',
  templateUrl: './print-apa.component.html',
  styleUrls: ['./print-apa.component.scss']
})
export class PrintApaComponent implements OnInit {
period:string="";
  empId: any;
  Name: string = '';
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
  constructor(private dialogRef: MatDialogRef<PrintApaComponent>, @Inject(MAT_DIALOG_DATA) data: any, private rtSvc: RatingService)
  { this.empId = data[0].id;
    this.period=data[0].period;
  }

  @ViewChild('content', { static: false }) el!: ElementRef;
  ngOnInit(): void {
    this.rtSvc.GetApprovedApa(this.empId, this.period).subscribe((result: any) => {
      if (result) {
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
        this.FirstRating =  result[0].FirstLevelRate ;
        this.SecondRating = result[0].SecondCode + '(' + result[0].SecondLevelRate + ')';
        if(result[0].ThirdCode!=null)
        this.ThirdRating=result[0].ThirdCode + '('+result[0].ThirdLevelRate+')';
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
