import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity('recipe-ingredient')
export class RecipeIngredient {

    @PrimaryGeneratedColumn()
    recipe_ingredient_id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipe_id)
    @JoinColumn({name: 'recipe_id'})
    recipe_id: number;

    @Column( { type: 'varchar',  length: 255, nullable: false})
    recipe_ingredient_info: string;

    @Column( { type: 'integer', nullable: true})
    recipe_ingredient_order: number;

}