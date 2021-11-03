import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TransaccionRequest } from 'src/app/models/TransaccionRequest';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  id:any;

  constructor(private http: HttpClient) { }

  endPointGet = 'http://localhost:8083/api/blockchain/show';

  getBlockchain(id: string){
    return this.http
      .get<TransaccionRequest>(this.endPointGet+ '/' + id)
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
