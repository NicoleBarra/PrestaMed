import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  
  endpointGetByEmail = "http://localhost:8084/api/usuario/verUsuario/email";
  endpointUpdate = "http://localhost:8084/api/usuario/actualizarUsuario";
  endpointDelete = "http://localhost:8084/api/usuario/eliminar";

  
  getUsuario(email: string) {
    console.log("el email que voy a buscar", email)
    return this.http
      .get<UsuarioResponse>(this.endpointGetByEmail + '/' + email)
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
