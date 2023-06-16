import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar:MatSnackBar) { }
  config:MatSnackBarConfig={
    duration:5000,
    horizontalPosition:'right',
    verticalPosition:'top'
  }
  success(msg:string){
    this.config['panelClass']=['notification','success'];
    this.snackBar.open(msg,'',this.config);
  }
  Failed(msg:string){
    this.config['panelClass']=['notification','failed'];
    this.snackBar.open(msg,'',this.config);
  }
  Warn(msg:string){
    this.config['panelClass']=['notification','warn'];
    this.snackBar.open(msg,'',this.config);
  }
}
