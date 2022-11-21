import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  type:any ='PieChart' ; 
  data = [
    ['firefox' ,45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7] 
  ];
  
  columns = ['Browser', 'Percentage']; 
  options = {
    colors: ['#00d2d3', '#feca57', '#FC427B', '#2ecc71', '#3742fa', '#ff6348'], is3D: true
  };
  
  width:any ='700'
  height: any ='700'



  constructor() {
    
  }

  ngOnInit(): void {
  }

  


}
