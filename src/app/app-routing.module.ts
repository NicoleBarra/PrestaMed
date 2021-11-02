import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { MyProductsAddComponent } from './components/my-products-add/my-products-add.component';
import { MyProductsEditComponent } from './components/my-products-edit/my-products-edit.component';
import { HistorialBlockchainComponent } from './components/historial-blockchain/historial-blockchain.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'mis-productos',
    component: MyProductsComponent,
  
},
{
  path: 'mis-productos-agregar',
  component: MyProductsAddComponent,

},
{
  path: 'mis-productos-editar',
  component: MyProductsEditComponent,

},
{
  path: 'historial-producto',
  component: HistorialBlockchainComponent,

},
{
  path: 'login', 
  component: LoginComponent, 

},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
