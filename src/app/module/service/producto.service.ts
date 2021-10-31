import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { ProductoRequest } from 'src/app/models/ProductoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  endpointAdd = 'http://localhost:8081/api/producto/agregar';

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
}
