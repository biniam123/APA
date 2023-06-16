import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApaStatusService } from 'src/app/Services/apa-status.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { DivisionService } from 'src/app/Services/division.service';
import { ExcelService } from 'src/app/Services/excel-service';
import { LocationService } from 'src/app/Services/location.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss']
})
export class StatusReportComponent implements OnInit {

  @ViewChild('paginator') paginator! : MatPaginator; 
  constructor(private lnsvc: LocationService, private divSvc: DivisionService,private excelSvc:ExcelService,
    private dptSvc: DepartmentService, private rt: ApaStatusService,private notification:NotificationService) { }
  search = new FormGroup({
    Location: new FormControl(''),
    Department: new FormControl(''),
    Division: new FormControl('')
  });
  displayedColumns: any = ['No', 'Location', 'Department', 'Division', 'Expected', 'Actual'];
  excelColumns:any=['Location', 'Department', 'Division', 'Expected', 'Actual'];
  divisions: any = [];
  locations: any = [];
  department: any = [];
  apadata!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.PopulateLocation();
    this.PopulateDepartment();
    this.PopulateStatus();
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
  PopulateStatus() {
    this.rt.getAPAStatus().subscribe((result:any) => {
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
        this.rt.getStatusReportByDepartment(this.search.controls["Department"].value, this.search.controls["Location"].value).subscribe((result:any) => {
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

  PopulateByLocation() {
    if (this.search.controls["Location"].valid) {
      this.rt.getStatusReportByLocation(this.search.controls["Location"].value).subscribe((result:any) => {
        this.apadata = new MatTableDataSource();
        this.apadata = new MatTableDataSource(result);
        this.apadata.paginator = this.paginator;
      });
    }
  }
  PopulateByDivision() {
    if (this.search.controls["Location"].value != "") {
      if (this.search.controls["Division"].valid) {
        this.rt.getStatusReportByDivision(this.search.controls["Division"].value,this.search.controls["Location"].value).subscribe((result:any) => {
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
    this.excelSvc.exportAsExcelFile('Status Report', '', this.excelColumns, this.apadata, 'Status', 'Status');
  }

}
