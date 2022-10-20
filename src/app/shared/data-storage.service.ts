import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map ,Observable,take,tap} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.services';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,
    private recipeservice:RecipesService,
    private authServ:AuthService) { }

  onStoreData(){
    const Data = this.recipeservice.getRecipes();
    this.http.put('https://ng-complete-guide-ef23c-default-rtdb.firebaseio.com/recipes.json',Data)
    .subscribe(response => { console.log(response)})
  }

  onFetchData(){
   
      return this.http.get<Recipe[]>('https://ng-complete-guide-ef23c-default-rtdb.firebaseio.com/recipes.json').pipe
      (map(recipes=>{
        return recipes.map(recipe=>{
          return {...recipe,ingrediants: recipe.ingrediants? recipe.ingrediants: []}
        })
      }) 
      ,tap(response =>
        {
         this.recipeservice.setRecipe(response as Recipe[])
         console.log(response)
       })).subscribe();
    
 
    
    
  }
}
