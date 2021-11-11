import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import Auth0Lock from 'auth0-lock';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
   
  }


  login(): void{
    this.auth.loginWithRedirect();
    console.log("boton");
  }
  
}