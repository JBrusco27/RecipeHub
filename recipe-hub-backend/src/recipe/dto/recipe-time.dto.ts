import { IsIn, IsNotEmpty, MaxLength, Min, MinLength, minLength } from "class-validator";
import { User } from "src/user/entities/user.entiy";

export class RecipeTimeDto{

    @IsNotEmpty()
    recipe_id: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    recipe_time_name: string;
    
    @IsNotEmpty()
    @Min(1)
    recipe_time_amount: number;

    @IsNotEmpty()
    @IsIn(['minutes', 'hours', 'days'])
    recipe_time_measure: string;
}
