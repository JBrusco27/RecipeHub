import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError} from 'rxjs';
import { UtilsService } from '../../../shared/services/utils.service';

export type loginResponse =  {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  loginJwt(email: string, password: string){
    return this.http.post<loginResponse>('http://localhost:3000/auth/login', {email, password})
    .pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  setJwtSession(jwtData: loginResponse){
    localStorage.setItem('jwtAccess', jwtData.accessToken);
    localStorage.setItem('jwtLogin', 'OK')
  }

  logged(): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/auth/isLogged`).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return of(false);
      })
    );
  }

  logout(){
    localStorage.removeItem('jwtAccess');
    localStorage.removeItem('jwtLogin');

    window.location.reload();
  }

}
