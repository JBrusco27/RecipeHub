import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../recipe/services/recipe.service';
import { UtilsService } from '../../shared/services/utils.service';
import { RecipePreviewComponent } from '../../shared/recipe-preview/recipe-preview.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterLink,
    RecipePreviewComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    readonly utilService: UtilsService,
  ){}

  id?: number;
  items: any = [];
  categoryName: string = 'Category Not Found';

  ngOnInit(){
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.recipeService.getCategoryById(this.id).subscribe((data: any) => {
      this.categoryName = data.recipe_category_name;
    });

    this.recipeService.getRecipeByCategory(this.id).subscribe((data: any) => {
      this.items = data;
    });
  }

}
