import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private  utilsService: UtilsService
  ) { }

  editUser(data: any){
    return this.http.post<any>('http://localhost:3000/user/edit', data).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

}
