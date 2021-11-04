import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import Auth0Lock from 'auth0-lock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prestamed';

  constructor(){
    console.log('profile')
    console.log(localStorage.getItem('profile'))
  }
}
