import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

import Auth0Lock from 'auth0-lock';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  options2 = {
    allowShowPassword: true,
    theme: {
      logo: 'https://i.ibb.co/VSWtg89/prestamed.png',
      primaryColor: '#355e3b'
    },
    auth: {
      redirectUrl: 'http://localhost:4200/',
      responseType: 'token id_token',
      audience: 'https://dev-kv-xwdtb.us.auth0.com/userinfo',
      params: {
        scope: 'openid profile'
      }
    },
    autoclose: true,
    oidcConformant: true,
    languageDictionary: {
      emailInputPlaceholder: "something@youremail.com",
      title: "PrestaMed"
    },
    additionalSignUpFields: [
    {
      name: "first_name",
      placeholder: "First Name",
      
    },
  {
    name:"last_name",
    placeholder: "Last Name",
  },
  {
    name:"zone",
    placeholder: "Delegación",
  },
]

  };

  lock = new Auth0Lock('qKT5xFSOK5eedEPbWhbYLCB3n9gVgIr8','dev-kv-xwdtb.us.auth0.com',this.options2)
  

  constructor(private router: Router) {
      this.lock.on('authenticated', (authResult: any) => {
        console.log("it works!")
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.log(error)
          }
          else{
           
            this.router.navigate(['/categorias']);
            
          }


    });
  });
;  }
  login() {
    this.lock.show();
    
  }
  logout() {
    
    
  }}