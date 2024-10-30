import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity('recipe-time')
export class RecipeTime {

    @PrimaryGeneratedColumn()
    recipe_time_id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipe_id)
    @JoinColumn({name: 'recipe_id'})
    recipe_id: number;

    @Column( { type: 'varchar',  length: 100, nullable: false})
    recipe_time_name: string;

    @Column( { type: 'integer', nullable: false})
    recipe_time_amount: number;

    @Column( { type: 'varchar',  length: 50, nullable: false})
    recipe_time_measure: string;

}