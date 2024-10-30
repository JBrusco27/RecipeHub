import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtUtilService } from 'src/auth/jwt/jwt-util.service';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecipeStep } from './entities/recipe-step.entity';
import { RecipeTime } from './entities/recipe-time.entity';
import { User } from 'src/user/entities/user.entiy';
import { Review } from './entities/review.entity';
import { RecipeCategory } from './entities/recipe-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, RecipeStep, RecipeTime, User, Review, RecipeCategory]), AuthModule],
  providers: [RecipeService],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule {}
