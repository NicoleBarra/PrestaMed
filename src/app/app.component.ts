import { Component } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import Auth0Lock from 'auth0-lock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prestamed';
 
  isLog= false;
  

  constructor(public auth: AuthService){

    console.log('profile')
    console.log(localStorage.getItem('profile'))
    console.log(localStorage.getItem('token'))
    
  }
  login() {
    
    this.isLog = true;
    console.log("entro", this.isLog);
    
  }
  logout() {
    
    this.isLog = false;
    
  }


}

