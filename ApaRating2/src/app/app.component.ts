import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'APA Rating';
  sideBarOpen=true;
  ngOnInit(){

  }
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }
}
