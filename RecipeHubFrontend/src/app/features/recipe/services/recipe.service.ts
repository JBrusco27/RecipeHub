import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UtilsService } from '../../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient,
    private  utilsService: UtilsService
  ) { }

  createRecipe(data: FormData) {
    return this.http.post<any>('http://localhost:3000/recipe/create', data).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  uploadImage(imageData: FormData) {
    return this.http.post<any>('http://localhost:3000/recipe/upload-image', imageData).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getRecipe(id: number){
    return this.http.get<any>(`http://localhost:3000/recipe/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  getRecipeByCategory(id: number){
    return this.http.get<any>(`http://localhost:3000/recipe/category/recipe/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  submitReview(data: any , id: number){
    return this.http.post<any>(`http://localhost:3000/recipe/create-review/${id}`, data).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  getMonthlyFavRecipes(){
    return this.http.get<any>(`http://localhost:3000/recipe/monthly-fav-recipes`).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  getCategoryById(id: number){
    return this.http.get<any>(`http://localhost:3000/recipe/recipe/category/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilsService.handleError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    )
  }


}
