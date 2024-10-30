import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity('recipe-step')
export class RecipeStep {

    @PrimaryGeneratedColumn()
    recipe_step_id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipe_id)
    @JoinColumn({name: 'recipe_id'})
    recipe_id: number;

    @Column( { type: 'text', nullable: false})
    recipe_step_info: string;

    @Column( { type: 'integer', nullable: true})
    recipe_step_order: number;

}