import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { Recipe } from './recipes/recipe.model';
import { RecipesService } from './recipes/recipes.services';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService:DataStorageService,private recipeService:RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const recipes = this.recipeService.getRecipes();
    if(recipes.length == 0){
    
     return (this.dataStorageService.onFetchData()) as unknown as Recipe[];
    }
    else
    return recipes
  }
}
