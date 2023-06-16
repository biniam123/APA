import { AutofillMonitor } from '@angular/cdk/text-field';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExceptionComponent } from '../modules/exception/exception.component';
import {MatConfirmDialogComponent} from '../modules/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }
  openConfirmDialog(msg:any){
    return this.dialog.open(MatConfirmDialogComponent,{
      width:'390px',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
  openExceptionalDialog(id:any, period:any){
    return this.dialog.open(ExceptionComponent,{
      width:'80%',
      height:'90%',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      data:{
        id:id,
        period:period
      }
    });
  }
  
}
