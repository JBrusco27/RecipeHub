import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";
import { User } from "src/user/entities/user.entiy";

@Entity('review')
export class Review {

    @PrimaryGeneratedColumn()
    review_id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipe_id)
    @JoinColumn({name: 'recipe_id'})
    recipe_id: number;

    @ManyToOne(() => User, (user) => user.user_id)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column( { type: 'integer', nullable: false})
    review_rating: number;

    @Column( { type: 'varchar',  length: 1000, nullable: true})
    review_comment: string;

    @CreateDateColumn()
    review_created_at: Date;

}