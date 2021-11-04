
   
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.css']
})
export class NavbarLoggedComponent implements OnInit {

  constructor(private auth:AuthService,@Inject(DOCUMENT)private doc: Document, private router: Router) { }

  ngOnInit(): void {
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.router.navigate(['']);
    this.auth.logout()

  
  }

}
