import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DBoxComponent } from '../d-box/d-box.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  submitted: boolean = true;
  errorBlock: boolean = true;
  errorMsg: any;

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {}

  // defined reactive form
  addNewRecord = new FormGroup({
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

  saveRecord() {
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
            data: 'Record saved in DB successfully',
          });
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
}
