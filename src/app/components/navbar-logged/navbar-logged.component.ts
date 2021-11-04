
   
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from "@angular/common";
import { AppComponent } from '../../app.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.css']
})
export class NavbarLoggedComponent implements OnInit {

  constructor(public authService: AuthService, @Inject(DOCUMENT)private doc: Document, private router: Router, public appComponent: AppComponent) { }

  ngOnInit(): void {
  }
  logout(): void {
    
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    
    this.authService.logout();
    this.router.navigate(['']);
  }

}
