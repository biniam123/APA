import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriateriaService } from 'src/app/Services/criateria.service';
import { ExcelService } from 'src/app/Services/excel-service';
import { ExceptionObjectvieService } from 'src/app/Services/exception-objectvie.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-view-exception',
  templateUrl: './view-exception.component.html',
  styleUrls: ['./view-exception.component.scss']
})
export class ViewExceptionComponent implements OnInit {

  constructor(private loginSvc:LoginService,private rot:Router,private router:ActivatedRoute,
    private epnSvc:ExceptionObjectvieService,private cr:CriateriaService,private excelSvc:ExcelService) { }

    displayedColumns:string[]=['No','Objective'];
    displayColumns:string[]=['CoreValue','Dedication','Adherence','Shouldering','Skill','Innovative','Share'];
  userId:any=[];
  empId:any=[];
  criateriaData:any=[];
  objectiveData:any=[];
  Name:string='';
  period:string='';

  ngOnInit(): void {
    this.loginSvc.getId.subscribe(result => {
      if (result) {
        this.userId = result;
        this.empId=this.router.snapshot.params['id'];
        this.period=this.router.snapshot.params['period'];
      }
      else {
        this.rot.navigate(['/login']);
      }
    });
    this.PopulateObjective();
    this.PopulateCriateria();
  }
  PopulateObjective(){
    this.epnSvc.getExceptionObjectiveByEmpId(this.empId, this.period).subscribe((result:any)=>{
      if(result){
        this.objectiveData=result;
        this.Name=result[0].EmployeeName;      }
    });
  }
  PopulateCriateria(){
    this.cr.getCriateria(this.empId, this.period).subscribe((result)=>{
      this.criateriaData=result;
    });
  }
  exportToWord(){
    this.rot.navigate(['/exportWord/'+this.empId,this.period]);;
  }
}
