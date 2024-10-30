import { Component, Input } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../features/recipe/services/recipe.service';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {

  @Input() recipe: any;
  recipePhotoUrl?: string;

  constructor(
    protected utilService: UtilsService,
  ){}

  ngOnInit(){
    this.recipePhotoUrl = this.recipe?.recipe_photo ? `http://localhost:3000/recipe/recipe-photo/${this.recipe?.recipe_photo}` : undefined;
  }

}
