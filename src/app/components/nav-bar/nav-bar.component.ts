import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatahubService } from 'src/app/service/datahub.service';
import { DBoxComponent } from '../d-box/d-box.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  dashboard: boolean = true;
  add: boolean = true;
  loginDetails: any;
  userFirstLtr: any;
  profileName: string | undefined | null;
  about:boolean= true;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.router.url == '/add-user') {
      this.dashboard = true;
      this.add = false;
    }
    if (this.router.url == '/dashboard') {
      this.profileName = localStorage.getItem('userName');
      this.dashboard = false;
      this.add = true;
    }
    if(this.router.url == '/about'){
      this.about= false;
    }
  }

  onLogoutClick() {
    localStorage.removeItem('userName');
    setTimeout(() => {
      this.dialog.open(DBoxComponent, {
        data: 'User logged out successfully.',
      });
    }, 700);
    this.router.navigate(['']);
    // location.reload();
  }
}
