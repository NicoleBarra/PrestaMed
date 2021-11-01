import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductoRequest } from 'src/app/models/ProductoRequest';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductoResponse } from 'src/app/models/ProductoResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  id_editar:any;

  constructor(private http: HttpClient) { }

  endpointAdd = 'http://localhost:8081/api/producto/agregar';
  endPointGetAll = 'http://localhost:8081/api/producto/verProductos';
  endPointDelete = 'http://localhost:8081/api/producto/eliminar';
  endPointEdit = 'http://localhost:8081/api/producto/actualizar';
  endpointGetById = 'http://localhost:8081/api/producto/verProducto';

  insertarProducto(producto: ProductoRequest) {
    this.http.post<ProductoRequest>(this.endpointAdd, producto).subscribe({
      next: (data) => {
        console.log('datos', data);
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
    console.log("el id que voy abuscar", id)
    return this.http
      .get<ProductoResponse>(this.endpointGetById + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  eliminarProducto(id: string){
    this.http.delete(this.endPointDelete + '/' + id).subscribe({
      next: () => {
        console.log('Delete successful');
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
      },
      error: (error) => {
        console.error(' error!', error);
      },
    });
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
