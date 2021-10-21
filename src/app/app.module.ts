import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-kv-xwdtb.us.auth0.com',
      clientId: 'qKT5xFSOK5eedEPbWhbYLCB3n9gVgIr8'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
