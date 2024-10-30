import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../shared/services/utils.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) {}


  signup(user: User){
    return this.http.post<User>('http://localhost:3000/user/signup', user)
      .pipe(
        catchError(error => {
          const errorMessage = error.error.message || 'An unknown error occurred';
          this.utilsService.handleError(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  uploadImage(imageData: FormData) {
    return this.http.post<any>('http://localhost:3000/user/upload-image', imageData).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
