import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../shared/services/utils.service';
import { HomeService } from '../home/home.service';
import { RecipeService } from '../recipe/services/recipe.service';
import { MatIcon } from '@angular/material/icon';
import { RecipePreviewComponent } from '../../shared/recipe-preview/recipe-preview.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    RecipePreviewComponent
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

  categories: any[] = [];
  recipesByCategory: { [key: number]: any[] } = {};

  constructor(
    protected utilService: UtilsService,
    private homeService: HomeService,
    private recipeService: RecipeService
  ){}

  ngOnInit() {
    this.homeService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.categories.forEach(category => {
        this.getItemsByCat(category.recipe_category_id);
      });
    });
  }

  getItemsByCat(id: number) {
    this.recipeService.getRecipeByCategory(id).subscribe((data: any) => {
      this.recipesByCategory[id] = data;
    });
  }


}
