import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

type SnackBarOptions ={
  'message': string,
  'action': string,
  'duration': number,
}


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}


  getCurrentRoute(): Observable<string> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)
    );
  }

  openSnackBar(snackBarOptions: SnackBarOptions){
    this.snackBar.open(snackBarOptions.message, snackBarOptions.action, {
      duration: snackBarOptions.duration,
    });
  }

  handleError<T>(message: string, result?: T): any{
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }

  getStars(rating: number): string[] {
    let rating02 = rating;
    let stars: string[] = [];

    for (let i = 0; i < 5; i++) {
      if (rating02 >= 1) {
        stars.push(`../../../assets/rating/star_1.svg`);
        rating02 -= 1;
      } else if (rating02 > 0) {
        stars.push(`../../../assets/rating/star_2.svg`);
        rating02 = 0;
      } else {
        stars.push(`../../../assets/rating/star_0.svg`);
      }
    }

    return stars;
  }

  getAverageRating(recipe: any){
    const sum = recipe?.recipe_review?.reduce((acc: any, review: any) => review.review_rating + acc, 0)
    return sum > 0 ? sum / recipe?.recipe_review?.length : 0;
  }

}
