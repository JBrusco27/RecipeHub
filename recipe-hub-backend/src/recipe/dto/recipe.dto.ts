import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entiy";
import { RecipeIngredientDto } from "./recipe-ingredient.dto";
import { RecipeStepDto } from "./recipe-step.dto";
import { RecipeTimeDto } from "./recipe-time.dto";
import { ReviewDto } from "./review.dto";
import { RecipeCategory } from "../entities/recipe-category.entity";

export class RecipeDto{

    @IsNotEmpty()
    user: User;

    recipe_category: RecipeCategory;

    @IsNotEmpty()
    @MinLength(0)
    @MaxLength(100)
    recipe_title: string;

    @IsNotEmpty()
    @MinLength(0)
    @MaxLength(1000)
    recipe_description: string;

    @IsNotEmpty()
    @MinLength(0)
    @MaxLength(255)
    recipe_photo: string;

    @IsNotEmpty()
    @Min(0)
    @Max(100)
    recipe_servings: number;

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    recipe_ingredients: RecipeIngredientDto[];

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    recipe_steps: RecipeStepDto[];

    @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    recipe_times: RecipeTimeDto[];

    reicipe_reviews: ReviewDto[];
}
