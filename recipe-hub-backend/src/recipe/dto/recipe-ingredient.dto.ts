import { IsNotEmpty, MaxLength, MinLength, minLength } from "class-validator";
import { User } from "src/user/entities/user.entiy";

export class RecipeIngredientDto{

    @IsNotEmpty()
    recipe_id: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    recipe_ingredient_info: string;
    
    @IsNotEmpty()
    recipe_ingredient_order: number;
}
