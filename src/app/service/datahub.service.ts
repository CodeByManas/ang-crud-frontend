import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DBoxComponent } from '../components/d-box/d-box.component';


@Injectable({
  providedIn: 'root',
})
export class DatahubService {
  IDforDelete: any;
  singleUserByID: any;
  secretLogData:any;
  token:any;
  loggedInUserArray:any=[];

  constructor(private http: HttpClient, private router:Router, private dialog:MatDialog) {
    // console.log(this.secretLogData, 'loginUser')
    
  }

 
  // get all records
  allRecords = () => {
    return this.http.get('http://localhost:8080/get');
  };

  // delete record
  deleteRecord(id: any) {
    this.IDforDelete = id;
  }

  getRecordById(id: any) {
    this.http.get(`http://localhost:8080/get/${id}`).subscribe((res: any) => {
      // console.log(res, 'from service')
      this.singleUserByID = res;
    });
  }



  loginFromService(email:any, password:any){
     // console.log(this.loginForm.value, 'form details');
     this.http.get(`http://localhost:8080/get-login/${email}/${password}`).subscribe((res)=>{
      
     
      this.secretLogData = res;
      if(this.secretLogData){
        localStorage.setItem('userName', this.secretLogData.name);
      }

      
  
      
      // console.log(this.secretLogData,'secretLogData');
      this.dialog.open(DBoxComponent, {data:'User login successfull'});
      this.router.navigate(['/dashboard']);
      setTimeout(()=>{
        this.dialog.closeAll();
      },1000);
      
    }, (err)=>{
      this.dialog.open(DBoxComponent, {data:err.error});
      this.router.navigate(['/login']);
    })
  }

 
}
