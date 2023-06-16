import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  title = 'APA Rating';
  sideBarOpen=true;
  ngOnInit(){

  }
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }

}
