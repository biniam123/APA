import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/Services/department.service';
import { DivisionService } from 'src/app/Services/division.service';
import { ExcelService } from 'src/app/Services/excel-service';
import { LocationService } from 'src/app/Services/location.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { RatingService } from 'src/app/Services/rating.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})


export class SummaryComponent implements OnInit {
  @ViewChild('paginator') paginator! : MatPaginator; 
  constructor(private lnsvc: LocationService, private divSvc: DivisionService, private notification: NotificationService,
    private dptSvc: DepartmentService, private rt: RatingService,private excelSvc:ExcelService, private datePipe:DatePipe) { }
  search = new FormGroup({
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
    Location: new FormControl(''),
    Department: new FormControl(''),
    Division: new FormControl('')
  });
  
  displayColumns: any = ['No', 'Name', 'Current Position', 'Site', 'Department', 'Division', 'Rating'];
  excelColumns: any = [ 'Name', 'Current Position', 'Site', 'Department', 'Division', 'Rating'];
  divisions: any = [];
  locations: any = [];
  department: any = [];
  apadata!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.PopulateLocation();
    this.PopulateDepartment();
    this.PopulateSummary();
  }
  PopulateSummary() {
    this.rt.getSummaryReport(this.datePipe.transform(this.search.controls["start"].value, "MM/dd/yyyy") + '-'+ 
    this.datePipe.transform(this.search.controls["end"].value, "MM/dd/yyyy")).subscribe((result:any) => {
      if (result) {
        this.apadata = new MatTableDataSource();
          this.apadata = new MatTableDataSource(result);
          this.apadata.paginator = this.paginator;
      }
    });
  }
  PopulateDivision() {
    if (this.search.controls["Location"].value != "") {
      if (this.search.controls["Department"].valid) {
        this.rt.getSummaryReportByDepartment(this.search.controls["Department"].value, this.search.controls["Location"].value,
        this.datePipe.transform(this.search.controls["start"].value, "MM/dd/yyyy") + '-'+ 
      this.datePipe.transform(this.search.controls["end"].value, "MM/dd/yyyy")).subscribe((result:any) => {
          this.apadata = new MatTableDataSource();
          this.apadata = new MatTableDataSource(result);
          this.apadata.paginator = this.paginator;
        });
        this.divSvc.getDivisionByDptId(this.search.controls["Department"].value).subscribe((result) => {
          this.divisions = result;
        });
      }
    }
    else {
      this.notification.Failed("Select Location");
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
  PopulateByLocation() {
    if (this.search.controls["Location"].valid && this.search.controls["start"].valid && this.search.controls["end"].valid) {
      this.rt.getSummaryReportByLocation(this.search.controls["Location"].value, 
      this.datePipe.transform(this.search.controls["start"].value, "MM/dd/yyyy") + '-'+ 
      this.datePipe.transform(this.search.controls["end"].value, "MM/dd/yyyy")).subscribe((result:any) => {
        this.apadata = new MatTableDataSource();
          this.apadata = new MatTableDataSource(result);
          this.apadata.paginator = this.paginator;
      });
    }
  }
  PopulateByDivision() {
    if (this.search.controls["Location"].value != "") {
      if (this.search.controls["Division"].valid) {
        this.rt.getSummaryReportByDivision(this.search.controls["Division"].value,
        this.search.controls["Location"].value,this.datePipe.transform(this.search.controls["start"].value, "MM/dd/yyyy") + '-'+ 
        this.datePipe.transform(this.search.controls["end"].value, "MM/dd/yyyy")).subscribe((result:any) => {
          this.apadata = new MatTableDataSource();
          this.apadata = new MatTableDataSource(result);
          this.apadata.paginator = this.paginator;
        });
      }
    }

    else {
      this.notification.Failed("Select Location");
    }
  }
  filterData($event: any){
    this.apadata.filter = $event.target.value;
  }
  exportToExcel(){
    this.excelSvc.exportAsExcelFile('Summary Report','',this.excelColumns,this.apadata,'Summary','Summary');
  }
}
