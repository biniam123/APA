import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoginService } from 'src/app/Services/login.service';
import { MappingService } from 'src/app/Services/mapping.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-employee-mapping',
  templateUrl: './employee-mapping.component.html',
  styleUrls: ['./employee-mapping.component.scss']
})
export class EmployeeMappingComponent implements OnInit {

  constructor(private emp:EmployeeService,private loginSvc:LoginService,private rot:Router,private map:MappingService,
    private notification:NotificationService,private dialogsvc:DialogService) { }
  superList:any=[];
  empList:any=[];
  mapList:any=[{ SupervisorId: null,SupervisorName:'',EmployeeId:null, EmployeeName: null }];
  mappedList:any=[];
  userId:any=[];
  employee:string='';
  supervisor:string='';
  displayedColumns: string[] = ['Name', 'action'];
  displayColumns: string[] = ['Name', 'action'];
  disColumns:string[]=['SupervisorName','EmployeeName'];
  disColumn:string[]=['SupervisorName','EmployeeName','delete'];
  maping=new FormGroup({
    SupervisorId:new FormControl(''),
    EmployeeId:new FormControl(''),
    SupervisorName:new FormControl(''),
    EmployeeName:new FormControl('')
  });
  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        this.PopulateMappedList();
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
  }
  PopulateMappedList(){
    this.map.getAllMapping().subscribe((result) => {
      if (result)
        this.mappedList = result;
    });
  }
  SelectSuper(id:any,name:string){
    this.mapList[0].SupervisorId=id;
    this.mapList[0].SupervisorName=name;
  }
  SelectEmp(id:any,name:string){
    this.mapList[0].EmployeeId=id;
    this.mapList[0].EmployeeName=name;
  }
  SaveMapping(){
    if(this.mapList[0].SupervisorId!=null && this.mapList[0].EmployeeId!=null){
      this.maping=new FormGroup({
        SupervisorId:new FormControl(this.mapList[0].SupervisorId),
        EmployeeId:new FormControl(this.mapList[0].EmployeeId),
        SupervisorName:new FormControl(this.mapList[0].SupervisorName),
        EmployeeName:new FormControl(this.mapList[0].EmployeeName)
      });
      this.map.SaveMappedUser( this.maping.value,this.userId).subscribe((result:any)=>{
        if(result){
          this.notification.success("Successfully Mapped");
          this.ngOnInit();
        }
        else{
          this.notification.Failed("Failed to Mapped");
        }
      });
      
    }
    
  }
  supervisory(){
    this.emp.getEmployeeFromAdByName(this.supervisor).subscribe((result) => {
      if (result) {
        this.superList = result;
      }
    });
  }
  employeeSearch(){
    this.emp.getEmployeeFromAdByName(this.employee).subscribe((result) => {
      if (result) {
        this.empList = result;
      }
    });
  }
  Delete(id:any){
    this.dialogsvc.openConfirmDialog('Are you sure to delete this record?').afterClosed().subscribe(data => {
      if (data) {
        this.map.deleteMapping(id).subscribe((result: any) => {

          if (result) {
            this.notification.Warn("Successfully Delete");
            this.ngOnInit();
          }
          else {
            this.notification.Failed("Failed to Delete");
          }

        });
      }
    });
  }
}
