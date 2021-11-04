import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import Auth0Lock from 'auth0-lock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'prestamed';
  isLog = true;
  
  constructor(public auth: AuthService){
    console.log('profile')
    console.log(localStorage.getItem('profile'))
    console.log(localStorage.getItem('token'))
  }
  ngOnInit(): void {
    if (localStorage.getItem("profile") === null) {
      this.isLog = false;
      console.log("entro falso", this.isLog);
      console.log("profile entro", localStorage.getItem("profile"));
    } else{
      this.isLog= true;
      console.log(this.isLog);
    }
  }
}
  
  


