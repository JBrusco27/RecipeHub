import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { Like, MoreThan, Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtUtilService } from 'src/auth/jwt/jwt-util.service';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecipeStep } from './entities/recipe-step.entity';
import { RecipeTime } from './entities/recipe-time.entity';
import { User } from 'src/user/entities/user.entiy';
import { ReviewDto } from './dto/review.dto';
import { Review } from './entities/review.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { RecipeIngredientDto } from './dto/recipe-ingredient.dto';



@Injectable()
export class RecipeService {

     constructor(
        private jwtUtilService: JwtUtilService,
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>,
        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
        @InjectRepository(RecipeStep)
        private readonly recipeStepRepository: Repository<RecipeStep>,
        @InjectRepository(RecipeTime)
        private readonly recipeTimeRepository: Repository<RecipeTime>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(RecipeCategory)
        private readonly recipeCategoryRepository: Repository<RecipeCategory>,

     ){}

    async createRecipe(dto: RecipeDto, accessToken: string) {

        const tokenData = this.jwtUtilService.getTokenData(accessToken);
        const user = await this.userRepository.findOne({ where: { user_id: tokenData.user_id } });
    
        if (!tokenData) {
            throw new UnauthorizedException('Wrong Jwt Token');
        }
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const recipe = this.recipeRepository.create({
            ...dto,
            user: user
        });
    
        const newRecipe = await this.recipeRepository.save(recipe);
    
        const newIngredients = dto.recipe_ingredients.map((ingredient, index) => {
            const recipeIngredient = new RecipeIngredient();
            recipeIngredient.recipe_id = newRecipe.recipe_id;
            recipeIngredient.recipe_ingredient_info = ingredient.recipe_ingredient_info;
            recipeIngredient.recipe_ingredient_order = index;
            return recipeIngredient;
        });
    
        const newSteps = dto.recipe_steps.map((step, index) => {
            const recipeStep = new RecipeStep();
            recipeStep.recipe_id = newRecipe.recipe_id;
            recipeStep.recipe_step_info = step.recipe_step_info;
            recipeStep.recipe_step_order = index;
            return recipeStep;
        });
    
        const newTimes = dto.recipe_times.map((time, index) => {
            const recipeTime = new RecipeTime();
            recipeTime.recipe_id = newRecipe.recipe_id;
            recipeTime.recipe_time_name = time.recipe_time_name;
            recipeTime.recipe_time_amount = time.recipe_time_amount;
            recipeTime.recipe_time_measure = time.recipe_time_measure;
            return recipeTime;
        });
    
        await this.recipeIngredientRepository.save(newIngredients);
        await this.recipeStepRepository.save(newSteps);
        await this.recipeTimeRepository.save(newTimes);
    
        return newRecipe;
    }
    

    async getRecipe(id: number){

        const recipe = await this.recipeRepository.findOne(
            {
                where: { recipe_id: id },
                relations: ['user', 'recipe_ingredient', 'recipe_step', 'recipe_time', 'recipe_review.user', 'recipe_category'],
                order: {
                    recipe_review: {
                      review_created_at: 'DESC'
                    }
                }
            }
        );

        if(!recipe){
            throw new NotFoundException('Recipe not found');
        }

        return recipe;
    }

    async createReview(dto: ReviewDto, id: number, accessToken: string){
        const tokenData = this.jwtUtilService.getTokenData(accessToken);
        const user = await this.userRepository.findOne({ where: { user_id: tokenData.user_id } });

        if (!tokenData) {
            throw new UnauthorizedException('Wrong Jwt Token');
        }
    
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const recipe = await this.recipeRepository.findOne({ where: { recipe_id: id } });
        if (!recipe) {
            throw new NotFoundException('Recipe not found');
        }
    
        const review = this.reviewRepository.create({
            review_rating: dto.review_rating,
            review_comment: dto.review_comment,
            recipe_id: id,
            user: user
        });
    
        return await this.reviewRepository.save(review);

    }
    async getMonthlyFavRecipes() {
        const limit: number = 15;
        const topRatedRecipes = await this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.recipe_review', 'review')
            .leftJoinAndSelect('recipe.recipe_category', 'category')
            .addSelect('AVG(review.review_rating) * COUNT(review.review_id)', 'score')
            .groupBy('recipe.recipe_id')
            .addGroupBy('review.review_id')
            .orderBy('score', 'DESC')
            .limit(limit)
            .getMany();
    
        return topRatedRecipes;
    }

    async search(query: string){

    const recipes = await this.recipeRepository.find({
        relations: ['recipe_category'],
        where: [
            { recipe_title: Like(`%${query}%`) },
            { recipe_category: { recipe_category_name: Like(`%${query}%`) } }
        ]
    });

        return recipes;
    }

    async getCategories(){
        const categories = await this.recipeCategoryRepository.find();
        return categories;
    }


    async getRecipeByCategory(id: number){
        const recipes = await this.recipeRepository.find({
            relations: ['recipe_category'],
            where: {
                recipe_category: {recipe_category_id: id}
            }
        });

        return recipes;
    }

    async getCategoryById(id: number){
        const category = await this.recipeCategoryRepository.findOne({ where: { recipe_category_id: id } });
        return category;
    }

}
