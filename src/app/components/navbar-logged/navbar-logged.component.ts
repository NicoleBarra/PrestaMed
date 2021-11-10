
   
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from "@angular/common";
import { AppComponent } from '../../app.component';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.css']
})
export class NavbarLoggedComponent implements OnInit {

  constructor(private auth:AuthService,@Inject(DOCUMENT)private doc: Document) { }

  ngOnInit(): void {
  }
  logout(): void {
    
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    this.auth.logout({returnTo: this.doc.location.origin});
    
  }
 
  

}
