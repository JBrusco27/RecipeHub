import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../shared/models/user.model";
import { catchError, throwError } from "rxjs";
import { UtilsService } from "../../shared/services/utils.service";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }


  getUserDetails(userId: number) {

    return this.http.get<User>(`http://localhost:3000/user/${userId}`)
    .pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }


  getUserDetailsFromToken() {
    const token = localStorage.getItem('jwtAccess');
    if (!token) {
      return;
    }

    const decoded: any = jwtDecode(token);
    return this.http.get<User>(`http://localhost:3000/user/${decoded.user_id}`)
    .pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

}
