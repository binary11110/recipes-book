import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediants.model";
import { ShoppingService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipesService{
    changeRecipe = new Subject<Recipe[]>();
    constructor(private slService:ShoppingService){

    }

    private recipes:Recipe[]=[];
    // private recipes:Recipe[]=[
    //     new Recipe('Strawbeery Milkshake'
    //     ,'big fat cheesy burger with our secret sause',
    //     'https://snipstock.com/assets/cdn/png/new/27e49b30c503cfd241b1e9653fd371f3.png'
    //     ,[new Ingrediant('strawbery',1)
    //       ,new Ingrediant('milk',1)]
    //     )
    //         ,
    //     new Recipe('fteer'
    //     ,'this is simply a test'
    //     ,'https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg'
    //     ,[ new Ingrediant('olives',5),
    //   new Ingrediant('flour',2)])
    //   ];

      setRecipe(recipes:Recipe[]){
        this.recipes = recipes;
        
        this.changeRecipe.next(this.recipes.slice());
      }
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipebyId(index:number){
        return this.recipes[index];
      }

      addIngrediantsToShoppingList(ingrediants:Ingrediant[]){
             this.slService.addToshoppingList(ingrediants);
      }

      addNewRecipe(newrecipe:Recipe){
this.recipes.push(newrecipe)
this.changeRecipe.next(this.recipes.slice())

      }
      addUpdatedRecipe(id:number,editedRecipe:Recipe){
        this.recipes[id]=editedRecipe;
        this.changeRecipe.next(this.recipes.slice())
        
      }
      DeleteRecipe(index:number){
         this.recipes.splice(index,1);
         this.changeRecipe.next(this.recipes.slice())
      }
}