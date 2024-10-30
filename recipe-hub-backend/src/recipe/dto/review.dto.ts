import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entiy";
import { RecipeIngredientDto } from "./recipe-ingredient.dto";
import { RecipeStepDto } from "./recipe-step.dto";
import { RecipeTimeDto } from "./recipe-time.dto";

export class ReviewDto{

    @IsNotEmpty()
    recipe_id: number;

    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    @Min(1)
    @Max(5)
    review_rating: number;

    @MinLength(0)
    @MaxLength(1000)
    review_comment: string;

}
