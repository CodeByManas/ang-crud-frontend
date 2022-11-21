import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DBoxComponent } from '../d-box/d-box.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatahubService } from 'src/app/service/datahub.service';

export interface hobby {
  name: string | undefined;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  addOnBlur: boolean = true;
  submitted: boolean = false;
  errorMsg: string = '';
  errorBlock: boolean = false;
  updateBtn: boolean = true;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: DatahubService
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/add-user') {
      this.updateBtn = false;
    }

    this.route.params.subscribe((param: any) => {
      if (param && param.id) {
        setTimeout(() => {
          // console.log(this.service.singleUserByID, 'from add-user')
          if (this.service.singleUserByID) {
            this.addNewRecord.setValue(this.service.singleUserByID);
          } else {
            this.router.navigate(['/add-user']);
          }
        }, 200);
      }
    });
  }

  // defined reactive form
  addNewRecord = new FormGroup({
    _id: new FormControl(),
    name: new FormControl('', Validators.required),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
      ),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    maritalstatus: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  // Submit the form data
  saveRecord() {
    // dont submit the form if its empty
    if (this.addNewRecord.invalid) {
      this.submitted = true;
      return;
    }

    this.submitted = false;
    // send the form data to DB
    this.http
      .post('http://localhost:8080/post', this.addNewRecord.value)
      .subscribe(
        () => {
          this.dialog.open(DBoxComponent, {
            data: 'Record has been added successfully',
          });
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000);
          this.addNewRecord.reset();
          this.submitted = false;
          this.errorBlock = false;
        },
        (err) => {
          this.errorMsg = err.error;
          console.log(this.errorMsg, 'this.errorMsg');
          this.errorBlock = true;
          this.dialog.open(DBoxComponent, { data: this.errorMsg });
        }
      );
  }

  updateRecord() {
    if (this.addNewRecord.invalid) {
      this.submitted = true;
      this.dialog.open(DBoxComponent, {
        data: 'There must be few changes in data',
      });
      setTimeout(() => {
        this.dialog.closeAll();
      }, 1000);
      return;
    }

    this.route.params.subscribe((param: any) => {
      this.http
        .put(
          `http://localhost:8080/update/${param.id}`,
          this.addNewRecord.value
        )
        .subscribe(() => {
          // this.addNewRecord.reset();
          // this.submitted= false;
          this.dialog.open(DBoxComponent, {
            data: 'Record has been updated successfully',
          });
          this.router.navigate(['/dashboard']);
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000);
        });
    });
  }

}
