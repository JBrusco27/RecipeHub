import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entiy';
import { Recipe } from './recipe/entities/recipe.entity';
import { RecipeIngredient } from './recipe/entities/recipe-ingredient.entity';
import { RecipeStep } from './recipe/entities/recipe-step.entity';
import { RecipeTime } from './recipe/entities/recipe-time.entity';
import { Review } from './recipe/entities/review.entity';
import { MulterModule } from '@nestjs/platform-express';
import { RecipeCategory } from './recipe/entities/recipe-category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'RecipeHubDb.sqlite',
      entities: [User, Recipe, RecipeIngredient, RecipeStep, RecipeTime, Review, RecipeCategory],
      synchronize: true, // Only on development
    }),
    RecipeModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
