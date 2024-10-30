import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";
import { User } from "src/user/entities/user.entiy";

@Entity('recipe-category')
export class RecipeCategory {

    @PrimaryGeneratedColumn()
    recipe_category_id: number;

    @OneToMany(() => Recipe, (recipe) => recipe.recipe_category)
    recipe_category: RecipeCategory;

    @Column( { type: 'varchar',  length: 100, nullable: false})
    recipe_category_name: string;

    @Column( { type: 'varchar',  length: 1000, nullable: false})
    recipe_category_description: string;


}