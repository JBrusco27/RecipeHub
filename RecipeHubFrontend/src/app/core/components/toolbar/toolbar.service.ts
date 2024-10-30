import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UtilsService } from '../../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  search(q: string){
    const params = new HttpParams().set('q', q);
    return this.http.get<any>(`http://localhost:3000/recipe/search/`, { params }).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

}