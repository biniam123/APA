import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PrintApaComponent } from '../print-apa/print-apa.component';

@Component({
  selector: 'app-single-page-report',
  templateUrl: './single-page-report.component.html',
  styleUrls: ['./single-page-report.component.scss']
})
export class SinglePageReportComponent implements OnInit {

  constructor(private empSvc:EmployeeService, private dialog:MatDialog, private datePipe:DatePipe) { }
  searchKeyValue: string = "";
  search=new FormGroup({
    searchKey:new FormControl(''),
    start: new FormControl(new Date('07/01/'+(new Date().getFullYear()-1))),
    end: new FormControl(new Date('06/30/'+(new Date().getFullYear()))),
  });
  period: string ="";
employeeList:any=[];
displayedColumns: string[] = ['No','Name', 'Print'];

  ngOnInit(): void {
  }
  
  openDialog(id:any) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "35%";
    config.data= [{id:id, period:this.period}];
    this.dialog.open(PrintApaComponent, config).afterClosed().subscribe(result=>{
      if(result){
        this.ngOnInit();
      }
      
    });      
    
  }
  onSearch(){
    
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
    this.searchKeyValue = "";
    this.search.reset({});
  }
  onSearchClear() {
    this.searchKeyValue = "";
    this.search.reset({});
  }
}
