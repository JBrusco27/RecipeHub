import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private  utilsService: UtilsService
  ) { }

  getCategories(): any {
    return this.http.get<any[]>('http://localhost:3000/recipe/categories').pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }




}
