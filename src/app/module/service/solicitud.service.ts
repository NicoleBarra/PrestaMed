import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SolicitudModelo } from 'src/app/models/SolicitudModelo';
import { SolicitudUsuario } from 'src/app/models/SolicitudUsuario';
import { SolicitudModeloAgregar } from 'src/app/models/SolicitudModeloAgregar';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  endpointAgregar = 'http://localhost:8085/api/solicitud/agregar';
  endpointMostrarTodas = 'http://localhost:8085/api/solicitud/showAll';
  endpointMostrarEnviadas = 'http://localhost:8085/api/solicitud/enviadas';
  endpointActualizarEstatus = 'http://localhost:8085/api/solicitud/actualizar';

  endpoint2Agregar = 'http://localhost:8089/api/solicitud/agregar';
  endpoint2MostrarTodas = 'http://localhost:8089/api/solicitud/showAll';
  endpoint2MostrarEnviadas = 'http://localhost:8089/api/solicitud/enviadas';
  endpoint2ActualizarEstatus = 'http://localhost:8089/api/solicitud/actualizar';

  insertarSolicitud(solicitudModelo: SolicitudModelo) {
    this.http.post<SolicitudUsuario>(this.endpointAgregar, solicitudModelo).subscribe({
      next: (data: any) => {
        console.log('datos', data);
      },
      error: (error: any) => {
        console.error(' error!', error);
      },
    });
  }

  getAllSolicitudes(id: string){
    return this.http
      .get<SolicitudUsuario>(this.endpointMostrarTodas + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  getSolicitudesPendientes(id: string){
    return this.http
      .get<SolicitudModelo[]>(this.endpointMostrarEnviadas + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  actualizarEstatusSolicitud(solicitudModelo: SolicitudModelo) {
    return this.http.put<SolicitudUsuario>(this.endpointActualizarEstatus, solicitudModelo)
  }

  insertar2Solicitud(solicitudModeloAgregar: SolicitudModeloAgregar) {
    this.http.post<SolicitudModeloAgregar>(this.endpoint2Agregar, solicitudModeloAgregar).subscribe({
      next: (data: any) => {
        console.log('datos', data);
      },
      error: (error: any) => {
        console.error(' error!', error);
      },
    });
  }

  get2AllSolicitudes(id: string){
    console.log(id)
    return this.http
      .get<SolicitudModelo[]>(this.endpoint2MostrarTodas + '/' + id)
      .pipe(retry(3), catchError(this.handleError));
  }

  actualizar2EstatusSolicitud(solicitudModelo: SolicitudModelo) {
    return this.http.put<SolicitudModelo>(this.endpoint2ActualizarEstatus, solicitudModelo)
  }

  get2SolicitudesPendientes(id: string){
    return this.http
      .get<SolicitudModelo[]>(this.endpoint2MostrarEnviadas + '/' + id)
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
