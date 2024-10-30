import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/user/login/login.component';
import { SignupComponent } from './features/user/signup/signup.component';
import { CreateRecipeComponent } from './features/recipe/create-recipe/create-recipe.component';
import { RecipeDetailComponent } from './features/recipe/recipe-detail/recipe-detail.component';
import { SearchComponent } from './features/search/search.component';
import { CategoryComponent } from './features/category/category.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ExploreComponent } from './features/explore/explore.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
   },
   {
     path: 'login',
     component: LoginComponent,
    },
    {
      path: 'signup',
      component: SignupComponent,
    },
    {
      path: 'recipe/create',
      component: CreateRecipeComponent,
    },
    {
      path: 'recipe/:id',
      component: RecipeDetailComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'category/:id',
      component: CategoryComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'explore',
      component: ExploreComponent
    },
    {
      path: '**',
      redirectTo: '',
     },

];
