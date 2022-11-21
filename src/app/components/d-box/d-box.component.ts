import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatahubService } from 'src/app/service/datahub.service';

@Component({
  selector: 'app-d-box',
  templateUrl: './d-box.component.html',
  styleUrls: ['./d-box.component.css'],
})
export class DBoxComponent implements OnInit {
  errorMsg: string = '';
  showHideBtns: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: DatahubService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.errorMsg = data;
    // console.log(this.errorMsg, ' from d-modal');
  }

  ngOnInit(): void {
    this.errorMsg = this.data;
    // console.log(this.errorMsg, ' from d-modal');
    if (this.errorMsg == 'Do you want to delete the record ?') {
      this.showHideBtns = true;
    } else {
      this.showHideBtns = false;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  deleteRecord() {
    console.log(this.service.IDforDelete);
    this.http
      .delete(`http://localhost:8080/delete/${this.service.IDforDelete}`)
      .subscribe(() => {
        this.showHideBtns = false;
        this.errorMsg = 'Record has been deleted successfully.';
      });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 900);
    this.router.navigate(['/dashboard']);
  }
}
