import { Recipe } from "src/recipe/entities/recipe.entity";
import { Review } from "src/recipe/entities/review.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column( {type: 'varchar', length: 100, nullable: false} )
    user_name: string;

    @Column( {type: 'varchar', length: 100, nullable: true} )
    user_lastname: string;

    @Column( {type: 'varchar', length: 245, nullable: false} )
    user_email: string;

    @Column( {type: 'varchar', length: 255, nullable: false} )
    user_password: string;

    @Column( {type: 'text', nullable: true} )
    user_profile_image: string;

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[]

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

    @CreateDateColumn()
    user_created_at: Date;

}