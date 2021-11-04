import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import Auth0Lock from 'auth0-lock';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public authService: AuthService, public appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  
}