import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { MyProductsComponent } from './components/my-products/my-products.component';

import { Routes, RouterModule } from '@angular/router';
import { MyProductsAddComponent } from './components/my-products-add/my-products-add.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyProductsEditComponent } from './components/my-products-edit/my-products-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MyProductsComponent,
  
},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    MyProductsComponent,
    MyProductsAddComponent,
    NavbarComponent,
    MyProductsEditComponent
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
