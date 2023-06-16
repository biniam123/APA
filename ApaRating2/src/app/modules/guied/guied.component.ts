import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-guied',
  templateUrl: './guied.component.html',
  styleUrls: ['./guied.component.scss']
})
export class GuiedComponent implements OnInit {

  constructor() { }
image:string='';
  ngOnInit(): void {
  }
  PopulateVideo(videoId:any){
    this.image='assets/'+videoId+'.mp4';
  }
}
