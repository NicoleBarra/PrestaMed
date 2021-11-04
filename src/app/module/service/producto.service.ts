import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductoRequest } from 'src/app/models/ProductoRequest';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductoResponse } from 'src/app/models/ProductoResponse';
import { TransaccionRequest } from 'src/app/models/TransaccionRequest';
import { BlockModel } from 'src/app/models/BlockModel';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  id_editar:any;

  transaccion: TransaccionRequest = {
    productId: '',
    blocks: []
  }

  block: BlockModel = {
    fechaInicio: '',
    fechaFin: '',
    tipoTransaccion: '',
    usuarioProveedor: '',
    usuarioFinal: '',
    comentario: ''
  }

  constructor(private http: HttpClient) { }

  endpointAdd = 'http://localhost:8081/api/producto/agregar';
  endPointGetAll = 'http://localhost:8081/api/producto/verProductos';
  endPointDelete = 'http://localhost:8081/api/producto/eliminar';
  endPointEdit = 'http://localhost:8081/api/producto/actualizar';
  endpointGetById = 'http://localhost:8081/api/producto/verProducto';
  endpointAddBlockGenesis = 'http://localhost:8083/api/blockchain/registroGenesis';
  endpointAddBlock = 'http://localhost:8083/api/blockchain/registroTransaccion';

  insertarProducto(producto: ProductoRequest) {
    this.http.post<ProductoResponse>(this.endpointAdd, producto).subscribe({
      next: (data) => {
        console.log('datos', data);
        this.crearBloqueGenesis(data._id, "Se agregó un producto", "Creación")
        this.insertarTransaccionGenesis(this.transaccion)
      },
      error: (error) => {
        console.error(' error!', error);
      },
    });
  }

  getAllProductos(){
    return this.http
      .get<ProductoResponse[]>(this.endPointGetAll)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProducto(id: string) {
    return this.http
      .get<ProductoResponse>(this.endpointGetById + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  eliminarProducto(id: string){
    this.http.delete(this.endPointDelete + '/' + id).subscribe({
      next: () => {
        console.log('Delete successful');
        this.crearBloque("Eliminación de producto", "Eliminación")
        this.insertarTransaccion(id, this.block)
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  editarProducto(producto: ProductoResponse){
    this.http.put<ProductoResponse>(this.endPointEdit, producto).subscribe({
      next: (data) => {
        console.log('datos', data);
        this.crearBloque("Edición de información del producto", "Edición")
        this.insertarTransaccion(data._id, this.block)
      },
      error: (error) => {
        console.error(' error!', error);
      },
    });
  }

  insertarTransaccionGenesis(transaccion: TransaccionRequest) {
    this.http.post<TransaccionRequest>(this.endpointAddBlockGenesis, transaccion).subscribe({
      next: (data) => {
        console.log('datos', data);
      },
      error: (error) => {
        console.error(' error!', error);
      },
    });
  }

  insertarTransaccion(id: string, block: BlockModel){
    this.http.post<TransaccionRequest>(this.endpointAddBlock + '/' + id, block).subscribe({
      next: (data) => {
        console.log('datos', data);
      },
      error: (error) => {
        console.error(' error!', error);
      },
    });
  }

  crearBloqueGenesis(id: string, comentario: string, tipoTransaccion: string){
    this.transaccion.productId = id
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    this.block.fechaInicio = hoy.toDateString()
    this.block.fechaFin = hoy.toDateString()
    this.block.usuarioProveedor = this.obtenerId()
    this.block.usuarioFinal = this.obtenerId()
    this.block.comentario = comentario
    this.block.tipoTransaccion = tipoTransaccion
    this.transaccion.blocks.push(this.block)
  }

  crearBloque(comentario: string, tipoTransaccion: string){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    this.block.fechaInicio = hoy.toDateString()
    this.block.fechaFin = hoy.toDateString()
    this.block.usuarioProveedor = this.obtenerId()
    this.block.usuarioFinal = this.obtenerId()
    this.block.comentario = comentario
    this.block.tipoTransaccion = tipoTransaccion
  }

  obtenerId(){
    const sub = JSON.parse(localStorage.getItem('profile') || '{}').sub
    return sub.substr(6, )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
