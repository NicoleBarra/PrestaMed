import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoResponse } from 'src/app/models/ProductoResponse';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RentSellFiltro } from 'src/app/models/RentSellFiltro';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  categoria:any;
  id:any;

  constructor(private http: HttpClient) { }

  endpointGetProductoCategoria = 'http://localhost:8082/api/catalogo/verProductos';
  endpointGetProductoId = 'http://localhost:8082/api/catalogo/verProducto';
  endpointMisProductos = 'http://localhost:8082/api/catalogo/verMisProductos';
  endpointRentSellFiltro = 'http://localhost:8082/api/catalogo/buscarProductoOpcion';

  getProductosCategoria(categoria: string){
    return this.http
      .get<ProductoResponse[]>(this.endpointGetProductoCategoria + '/' + categoria)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProductoId(id: string){
    return this.http
      .get<ProductoResponse>(this.endpointGetProductoId + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  getMisProductos(id: string) {
    return this.http
      .get<ProductoResponse[]>(this.endpointMisProductos + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProductosFiltroRentSell(opcion: string) {
    return this.http
      .get<ProductoResponse[]>(this.endpointRentSellFiltro + '/' + opcion)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProductosFiltroRentSellOrderBy(opcion: string, orderBy: string) {
    return this.http
      .get<ProductoResponse[]>(this.endpointRentSellFiltro + '/' + opcion + '/' + orderBy)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProductosFiltroCategoriaRentSell(categoria: string, opcion: string) {
    return this.http
      .get<ProductoResponse[]>(this.endpointGetProductoCategoria + '/' + categoria + '/' + opcion)
      .pipe(retry(3), catchError(this.handleError));
  }

  getProductosFiltroCategoriaRentSellPrecio(categoria: string, opcion: string, orderBy: string) {
    return this.http
      .get<ProductoResponse[]>(this.endpointGetProductoCategoria + '/' + categoria + '/' + opcion + '/' + orderBy)
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
