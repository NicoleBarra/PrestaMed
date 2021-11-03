import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoResponse } from 'src/app/models/ProductoResponse';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  categoria:any;
  id:any;

  constructor(private http: HttpClient) { }

  endpointGetProductoCategoria = 'http://localhost:8082/api/catalogo/verProductos';
  endpointGetProductoId = 'http://localhost:8082/api/catalogo/verProducto';

  getProductosCategoria(categoria: string){
    return this.http
      .get<ProductoResponse[]>(this.endpointGetProductoCategoria + '/' + categoria)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProductoId(id: string){
    console.log(id)
    return this.http
      .get<ProductoResponse>(this.endpointGetProductoId + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
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
