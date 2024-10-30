import { Component, HostListener, signal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../home/home.service';
import { MatOption } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { LoginService } from '../../user/services/login.service';

export interface Ingredient {
  info: string;
  order: number;
}

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkDropList,
    CdkDrag,
    MatIcon,
    CommonModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  selectedFile!: ImageSnippet;
  categories: any = [];
  isLogged: boolean = false;
  fileName: string = '';

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private loginService: LoginService,
    private homeService: HomeService
  ){}

  ngOnInit(){

    this.loginService.logged().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;

      if(!isLogged){
        this.router.navigate(['/home'])
      }
    });


    this.homeService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  windowWidth = signal(window.innerWidth);
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }


  recipeTimeMeasureOption: string[] = ['minutes', 'hours', 'days'];

  generalInfoForm: FormGroup = new FormGroup({
    recipe_title: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    recipe_description: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(1000)]),
    recipe_servings: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    recipe_ingredients: new FormArray([], [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    recipe_steps: new FormArray([], [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    recipe_times: new FormArray([], [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    recipe_photo: new FormControl('default', [Validators.required]),
    recipe_category: new FormControl(null, [Validators.required])
  })

  createRecipe(){
    if(!this.isLogged){
      return;
    }

    if(!this.generalInfoForm.valid){
      return;
    }

    if(!this.selectedFile){
      return;
    }

    let formData = new FormData
    formData.append('file', this.selectedFile.file)

    this.recipeService.uploadImage(formData).subscribe(
      {
        next: (file) => {
          this.generalInfoForm.patchValue({
            recipe_photo: file.filename
          })

          this.recipeService.createRecipe(this.generalInfoForm.value).subscribe(
            {
              next: (data) => {
                this.router.navigate(['/home'])
              }
            }
          )
        }
      }
    )
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = new ImageSnippet(URL.createObjectURL(file), file);
      this.fileName = file.name;

    }
  }

  dropIngredient(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipeIngredients.controls, event.previousIndex, event.currentIndex);
    this.recipeIngredients.controls.forEach((control, index) => {
      control.get('recipe_ingredient_order')!.setValue(index);
    });
  }

  dropStep(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipeSteps.controls, event.previousIndex, event.currentIndex);
    this.recipeSteps.controls.forEach((control, index) => {
      control.get('recipe_step_order')!.setValue(index);
    });
  }

  get recipeIngredients() {
    return this.generalInfoForm.get('recipe_ingredients') as FormArray;
  }

  get recipeSteps() {
    return this.generalInfoForm.get('recipe_steps') as FormArray;
  }

  get recipeTimes() {
    return this.generalInfoForm.get('recipe_times') as FormArray;
  }

  addIngredient() {
    this.recipeIngredients.push(new FormGroup({
      recipe_ingredient_info: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      recipe_ingredient_order: new FormControl(this.recipeIngredients.length, [Validators.required])
    }));
  }

  addTime() {
    this.recipeTimes.push(new FormGroup({
      recipe_time_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      recipe_time_amount: new FormControl('', [Validators.required, Validators.min(1)]),
      recipe_time_measure: new FormControl('', [Validators.required]),
    }));
  }

  addStep() {
    this.recipeSteps.push(new FormGroup({
      recipe_step_info: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
      recipe_step_order: new FormControl(this.recipeSteps.length, [Validators.required])
    }));
  }

  removeIngredient(i: number) {
    this.recipeIngredients.removeAt(i);
  }

  removeStep(i: number) {
    this.recipeSteps.removeAt(i);
  }

  removeTime(i: number) {
    this.recipeTimes.removeAt(i);
  }



}
