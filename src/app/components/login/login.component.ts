import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DBoxComponent } from '../d-box/d-box.component';
import { DatahubService } from 'src/app/service/datahub.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;

  // password_pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private service: DatahubService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl('', Validators.required),
  });

  loginUser() {
    if (this.loginForm.invalid) {
      this.invalid = true;
      return;
    }
    this.service.loginFromService(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    this.http.get('https://localhost:5700/').subscribe((res:any)=>{console.log(res, 'response')})
    // console.log(img,'askjdasd')
  }
}
