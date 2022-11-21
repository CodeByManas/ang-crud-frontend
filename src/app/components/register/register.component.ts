import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DBoxComponent } from '../d-box/d-box.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  cpwd: boolean = false;

  constructor(private router: Router, private dialog: MatDialog, private http:HttpClient) {}

  ngOnInit(): void {}
  register = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$'),
    ]),
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
    pwd: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
      ),
    ]),
    cpwd: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
      ),
    ]),
  });

  // matching password with confirm pasword
  match() {
    if (this.register.value.pwd != this.register.value.cpwd) {
      this.submitted = false;
      this.cpwd = true;
      return;
    }
  }

  // register new user
  registerUser() {
    if (this.register.invalid) {
      this.submitted = true;
      this.cpwd = false;
      return;
    }
    if (this.register.value.pwd != this.register.value.cpwd) {
      this.submitted = false;
      this.cpwd = true;
      return;
    }

    this.http.post('http://localhost:8080/register', this.register.value).subscribe(()=>{
      this.submitted = false;
      this.dialog.open(DBoxComponent, {
      data: 'User registrated successfully.',
    });
    this.router.navigate(['/login']);
    },(err)=>{
      console.log(err.error, 'error got')
      this.dialog.open(DBoxComponent, {
        data: err.error,
      });
    });
  }
}
