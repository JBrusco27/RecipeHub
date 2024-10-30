import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { RecipeService } from '../recipe/services/recipe.service';
import { UtilsService } from '../../shared/services/utils.service';
import { RouterLink } from '@angular/router';
import { RecipePreviewComponent } from "../../shared/recipe-preview/recipe-preview.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RecipePreviewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']})

  export class HomeComponent {

  items: any = [];

  constructor(
    private homeService: HomeService,
    private recipeService: RecipeService,
    readonly utilService: UtilsService
  ) {}

  categories: any = [];

  getMonthlyFavRecipes(){
    this.recipeService.getMonthlyFavRecipes().subscribe((data: any) => {
      this.items = data;
    })
  }

  ngOnInit(){
    this.getMonthlyFavRecipes();

    this.homeService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

}
