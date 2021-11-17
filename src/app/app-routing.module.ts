import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { MyProductsAddComponent } from './components/my-products-add/my-products-add.component';
import { MyProductsEditComponent } from './components/my-products-edit/my-products-edit.component';
import { HistorialBlockchainComponent } from './components/historial-blockchain/historial-blockchain.component';
import {CategoriasComponent} from './components/categorias/categorias.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { EditarPerfilUsuarioComponent } from './components/editar-perfil-usuario/editar-perfil-usuario.component';
import { FiltradoComponent } from './components/filtrado/filtrado.component';
import { ProductoComponent } from './components/producto/producto.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { SolicitudesEnviadasComponent } from './components/solicitudes-enviadas/solicitudes-enviadas.component';

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
  path: 'categorias',
  component: CategoriasComponent,

},
{
  path: 'perfil',
  component: PerfilUsuarioComponent,

},
{
  path: 'editar-perfil',
  component: EditarPerfilUsuarioComponent ,

},
{
  path: 'filtrado',
  component: FiltradoComponent ,
},
{
  path: 'producto',
  component: ProductoComponent ,
},
{
  path: 'login',
  component: LoginComponent,

},
{
  path: '',
  component: LandingComponent,

},
{
  path: 'solicitudes',
  component: SolicitudesComponent,

},
{
  path: 'solicitudes-enviadas',
  component: SolicitudesEnviadasComponent,

},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
