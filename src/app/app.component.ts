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

    
  }
  user: string= "u";
  email: string= "";
  
ngOnInit(): void {
  this.auth.user$.subscribe((user) => {
   
    user = user;
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
    console.log(localStorage.getItem('user'));
    
const userStr = localStorage.getItem('user');
if (userStr ) { 
 
  const userObj = JSON.parse(userStr);
  
  localStorage.setItem('email', JSON.stringify(userObj.name));
console.log(localStorage.getItem('email'));  // Alex
 
}

   
  })
}

}

