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

  constructor(public auth: AuthService){}

  
  options = {
    additionalSignUpFields: [{
      name: "address",
      placeholder: "enter your address",
      // The following properties are optional
    },
    {
      name: "full_name",
      placeholder: "Enter your full name"
    }]

  }
  

  options2 = {
    allowShowPassword: true,
    theme: {
      logo: 'https://i.ibb.co/VSWtg89/prestamed.png',
      primaryColor: '#355e3b'
    },
    auth:{
      redirect: true,
      redirectUrl: 'http://localhost:4200/'
    },
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

  loginWithRedirect(){

    var options = {
      callbackURL: 'http://localhost:3000/',
      responseType: 'token'
    }

    this.lock.show({
    });
  }

  logout(){
    this.lock.logout({});
  }

  
}
