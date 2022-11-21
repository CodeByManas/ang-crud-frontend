import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatahubService } from 'src/app/service/datahub.service';
import { MatDialog } from '@angular/material/dialog';
import { DBoxComponent } from '../d-box/d-box.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listOfAllRecords: any;
  noDataContent: boolean = false;
  randomCol: any;

  constructor(
    private service: DatahubService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/dashboard') {
      this.getAllRecords();
    } else {
      this.getAllRecords();
    }

    this.http.get('http://localhost:5600/getUploads').subscribe((res:any)=>{ console.log(res, 'finally')})
  }

  reloadPage() {
    window.location.reload();
  }

  getAllRecords = () => {
    this.service.allRecords().subscribe((res: any) => {
      this.listOfAllRecords = res;

      if (this.listOfAllRecords.length == 0) {
        this.noDataContent = true;
      }
    });
  };

  // delete a record
  onDeleteRecord(id: any) {
    this.dialog.open(DBoxComponent, {
      data: 'Do you want to delete the record ?',
    });
    this.service.deleteRecord(id);
  }

  // update record
  updateRecord(id: any) {
    this.router.navigate(['/update-user', id]);
    this.service.getRecordById(id);
  }


  
}
