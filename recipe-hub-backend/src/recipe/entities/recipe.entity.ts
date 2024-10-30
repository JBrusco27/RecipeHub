import { User } from "src/user/entities/user.entiy";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeIngredient } from "./recipe-ingredient.entity";
import { RecipeStep } from "./recipe-step.entity";
import { RecipeTime } from "./recipe-time.entity";
import { Review } from "./review.entity";
import { RecipeCategory } from "./recipe-category.entity";

@Entity('recipe')
export class Recipe {

    @PrimaryGeneratedColumn()
    recipe_id: number;

    @ManyToOne(() => User, (user) => user.user_id)
    @JoinColumn({name: 'user'})
    user: User;

    @ManyToOne(() => RecipeCategory, (recipeCategory) => recipeCategory.recipe_category_id)
    @JoinColumn({name: 'recipe_category'})
    recipe_category: RecipeCategory;

    @Column( { type: 'varchar',  length: 255, nullable: false})
    recipe_title: string;

    @Column( { type: 'text', nullable: false})
    recipe_description: string;

    @Column( { nullable: true})
    recipe_photo: string;

    @Column( { type: 'integer', nullable: false})
    recipe_servings: number;

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe_id)
    @JoinColumn({name: 'recipe_ingredient'})
    recipe_ingredient: RecipeIngredient[];

    @OneToMany(() => RecipeStep, (recipeStep) => recipeStep.recipe_id)
    @JoinColumn({name: 'recipe_step'})
    recipe_step: RecipeStep[];

    @OneToMany(() => RecipeTime, (recipeTime) => recipeTime.recipe_id)
    @JoinColumn({name: 'recipe_time'})
    recipe_time: RecipeTime[];

    @OneToMany(() => Review, (review) => review.recipe_id)
    @JoinColumn({name: 'review'})
    recipe_review: Review[];
    
    @CreateDateColumn()
    recipe_created_at: Date;

}