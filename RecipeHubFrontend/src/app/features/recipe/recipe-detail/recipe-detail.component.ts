import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../user/services/login.service';
import { UserService } from '../../../core/services/user.service';
import { RatingModule } from 'primeng/rating';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatIcon, RatingModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {

  isLogged: boolean = false;
  recipe: any;
  reviews: any[] = [];
  id: any;
  user: any;
  recipePhotoUrl?: string;
  userProfileImageUrl?: string;
  canReview: boolean = false;

  formGroup: FormGroup = new FormGroup({
    review_rating: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('[1-5]')]),
    review_comment: new FormControl('', [Validators.minLength(0), Validators.maxLength(1000)])
  });

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
    readonly utilService: UtilsService
  ){
  };

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadRecipe();

    this.loginService.logged().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;

      if(this.isLogged){
        this.userService.getUserDetailsFromToken()!.subscribe(
          data => {
            this.user = data;
            this.canReview = this.user.user_id !== this.recipe?.user?.user_id;
            this.userProfileImageUrl = 'http://localhost:3000/user/user-profile-image/' + this.user.user_profile_image
          }
        );
      }
    });

  }

  loadRecipe(){
    this.recipeService.getRecipe(this.id).subscribe(
      (data: any) => {
        this.recipe = data;
        this.recipePhotoUrl = this.recipe?.recipe_photo ? `http://localhost:3000/recipe/recipe-photo/${this.recipe?.recipe_photo}` : undefined;
      }
    )
  }

  getUserAlreadyReviewed(){
    return this.recipe?.recipe_review?.some((review: any) => {
      return review.user.user_id === this.user.user_id;
    });
  }


  getTotalTime(): string {
    let obj: any = {
      minutes: 0,
      hours: 0,
      days: 0
    };

    this.recipe?.recipe_time?.forEach((time: any) => {
      obj[time.recipe_time_measure] += time.recipe_time_amount;
    });

    const timeStrings: string[] = [];

    if (obj.days) timeStrings.push(`${obj.days}d`);
    if (obj.hours) timeStrings.push(`${obj.hours}h`);
    if (obj.minutes) timeStrings.push(`${obj.minutes}m`);

    return timeStrings.join(', ');
  }

  getOrderedSteps(){
    const steps = this.recipe?.recipe_step;

    if(!steps){
      return [];
    }

    return steps.sort((a: any, b: any) => a.recipe_step_order - b.recipe_step_order);
  }

  submitReview(){
    if(!this.isLogged){
      return;
    }

    if(!this.formGroup.valid){
      return;
    }

    if(this.getUserAlreadyReviewed()){
      return;
    }

    if(!this.canReview){
      return;
    }

    this.recipeService.submitReview(this.formGroup.value, this.recipe.recipe_id).subscribe(
      (data: any) => {
        window.location.reload();
      }
    )
  }



}