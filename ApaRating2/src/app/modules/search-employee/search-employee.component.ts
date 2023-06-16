import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { MappingService } from 'src/app/Services/mapping.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {

  constructor(private emp: EmployeeService, private dialog: MatDialog, private loginSvc: LoginService,
     private rot: Router,private notification:NotificationService,private map:MappingService, private datePipe: DatePipe) { }
  searchKeyValue: string = "";
  userId: any = [];
  self: Boolean = false;
  search = new FormGroup({
    searchKey: new FormControl(),
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });
  Self = new FormGroup({
    CheckSelf: new FormControl('false')
  });
  employeeList: any = [];
  displayedColumns: string[] = ['Name', 'action'];

  ngOnInit(): void {
    var date = new Date();
   //console.log(this.datePipe.transform(date,"yyyy-MM-dd"));
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
  }
  onSearchClear() {
    this.searchKeyValue = "";
  }
  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "60%";
    this.dialog.open(SearchEmployeeComponent, config).afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
  setValue(e: any) {
    if (e.checked) {
      //this.rot.navigate(['/Objective/'+this.userId]);
      const obj =
        {
          id: this.userId,
          startDate: this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy"),
          endDate: this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy")
        };
      this.rot.navigate(['/Objective',obj.id,obj.startDate,obj.endDate]);
      
    } else {
      this.self = false;
    }
  }
  onSearch() {

    this.emp.getEmployeeFromAdByName(this.searchKeyValue).subscribe((result) => {
      if (result) {
        this.employeeList = result;
      }
    });


  }
  SelectEmployee(id:any){
    this.map.getEmployeeMapping(id,this.userId).subscribe((result:any)=>{
      if(result.length>0){
        const obj =
        {
          id: id,
          startDate: this.datePipe.transform(this.search.controls['start'].value,"MM/dd/yyyy"),
          endDate: this.datePipe.transform(this.search.controls['end'].value,"MM/dd/yyyy")
        };
          this.rot.navigate(['/Objective',id,obj.startDate,obj.endDate]);
        }
      else{
        this.notification.Failed('You are not allowed to Fill APA for this Employee.');
        this.ngOnInit();
      }
    })
  }
  onClose() {

    this.searchKeyValue = "";
  }
}
