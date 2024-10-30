import { IsNotEmpty, MaxLength, MinLength, minLength } from "class-validator";
import { User } from "src/user/entities/user.entiy";

export class RecipeStepDto{

    @IsNotEmpty()
    recipe_id: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(1000)
    recipe_step_info: string;
    
    @IsNotEmpty()
    recipe_step_order: number;
}
