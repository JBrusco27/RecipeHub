import { Body, Controller, Get, Headers, Logger, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';
import { ReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { extname } from 'path';
import * as path from 'path';



@Controller('recipe')
export class RecipeController {

    constructor(
        private recipeService: RecipeService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createRecipe(
        @Body() Dto: RecipeDto,
        @Headers('Authorization') accessToken: string,
    ){

        return this.recipeService.createRecipe(Dto, accessToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-review/:id')
    createReview(
        @Param('id') id: number,
        @Body() Dto: ReviewDto,
        @Headers('Authorization') accessToken: string
    ){
        return this.recipeService.createReview(Dto, id, accessToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload-image')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/recipephoto',
            filename(req, file, callback) {
                const unique = Date.now() + '_' + Math.round(Math.random() * 1e9)
                callback(null, `thumbnail_${unique}.png`)
            },
        })
    }))
    uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Headers('Authorization') accessToken: string
    ) {
        return file;
    }

    @Get('recipe-photo/:filename')
    getFile(@Res() res: Response, @Param('filename') filename: string) {
        const filePath = path.join(__dirname, '..', '..', 'uploads/recipephoto', filename);
        
        return res.sendFile(filePath);
    }
    
    @Get('monthly-fav-recipes')
    getMonthlyFavRecipes(
    ){
        return this.recipeService.getMonthlyFavRecipes();
    }

    
    @Get('recipe/category/:id')
    getCategoryById(
        @Param('id') id: number
    ){
        return this.recipeService.getCategoryById(id);
    }

    @Get('categories')
    getCategories(){
        return this.recipeService.getCategories();
    }

    @Get('category/recipe/:id')
    geyRecipeByCategory(
        @Param('id') id: number
    ){
        return this.recipeService.getRecipeByCategory(id);
    }

    @Get('search')
    search(
        @Query('q') query: string
    ){
        return this.recipeService.search(query);
    }

    @Get(':id')
    getRecipe(
        @Param('id') id: number,
    ){
        return this.recipeService.getRecipe(id);
    }

    
}