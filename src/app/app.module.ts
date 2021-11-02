import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { MyProductsAddComponent } from './components/my-products-add/my-products-add.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyProductsEditComponent } from './components/my-products-edit/my-products-edit.component';
import { HistorialBlockchainComponent } from './components/historial-blockchain/historial-blockchain.component';
import { CategoriasComponent } from './components/categorias/categorias.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    MyProductsComponent,
    MyProductsComponent,
    MyProductsAddComponent,
    NavbarComponent,
    MyProductsEditComponent,
    HistorialBlockchainComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-kv-xwdtb.us.auth0.com',
      clientId: 'qKT5xFSOK5eedEPbWhbYLCB3n9gVgIr8'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
