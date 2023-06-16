import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApaStatusService } from 'src/app/Services/apa-status.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { DivisionService } from 'src/app/Services/division.service';
import { LocationService } from 'src/app/Services/location.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-apa-status',
  templateUrl: './apa-status.component.html',
  styleUrls: ['./apa-status.component.scss']
})
export class ApaStatusComponent implements OnInit {
  @ViewChild('paginator') paginator! : MatPaginator; 
  constructor(private lnsvc: LocationService, private divSvc: DivisionService, private rot: Router, private notification: NotificationService,
    private dptSvc: DepartmentService, private apaSvc: ApaStatusService, private loginSvc: LoginService,private dialogsvc:DialogService) { }
  search = new FormGroup({
    Id: new FormControl('0'),
    Location: new FormControl(''),
    Department: new FormControl(''),
    Division: new FormControl(''),
    Expected: new FormControl('')
  });
  displayedColumns: any = ['No', 'Location', 'Department', 'Division', 'Expected', 'delete', 'edit'];
  divisions: any = [];
  locations: any = [];
  department: any = [];
  apadata!: MatTableDataSource<any>;
  userId: any;

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
    this.PopulateLocation();
    this.PopulateDepartment();
    this.PopulateStatus();
  }
  PopulateStatus() {
    this.apaSvc.getAPAStatus().subscribe((result:any) => {
      if (result) {
        this.apadata = new MatTableDataSource();
          this.apadata = new MatTableDataSource(result);
          this.apadata.paginator = this.paginator;
      }
    });
  }
  PopulateDivision() {
    if (this.search.controls["Department"]) {
      this.divSvc.getDivisionByDptId(this.search.controls["Department"].value).subscribe((result) => {
        this.divisions = result;
      });
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
  SaveApaStatus() {
    
    if (this.search.controls["Id"].value!=0 && this.search.controls["Id"].value!=null) {
      this.apaSvc.updateApaStatus(this.userId, this.search.value).subscribe(result => {
        if (result) {
          this.notification.success("Successfully Updated");
          
          this.ngOnInit();
        }
        else {
          this.notification.Failed("Failed to Update");
          
          this.ngOnInit();
        }
      });
    }
    else {
      
        this.apaSvc.saveApaStatus(this.userId, this.search.value).subscribe((result) => {
          if (result) {
            this.notification.success("Successfully Added");
            
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Save");
            
            this.ngOnInit();
          }
        });
      }

    
  }
  filterData($event: any){
    this.apadata.filter = $event.target.value;
  }
  Delete(id: any) {
    this.dialogsvc.openConfirmDialog('Are you sure to delete this record?').afterClosed().subscribe(data => {
      if (data) {
        this.apaSvc.deleteApaStatus(id).subscribe(result => {
          if (result) {
            this.notification.success("Successfully Deleted");
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Delete");
            this.ngOnInit();
          }
        });
      }
    });
  }

  Update(id: any) {
      this.apaSvc.getAPAStatusById(id).subscribe((result: any) => {
        this.search = new FormGroup({
          Id: new FormControl(result[0].Id),
          Location: new FormControl(result[0].Location),
          Department: new FormControl(result[0].Department),
          Division: new FormControl(result[0].Division),
          Expected: new FormControl(result[0].Expected)
        });
        this.PopulateDivision();
      });
    }

}
