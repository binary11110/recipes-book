import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingrediant } from 'src/app/shared/ingrediants.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe!:Recipe;
id!:number;
  constructor(private activerouter:ActivatedRoute,
    private recipeservice:RecipesService,
    private router:Router) { }

  ngOnInit(): void {
    this.activerouter.params.subscribe(
      (params:Params)=> {
      this.id = +params['id'];
      this.recipe = this.recipeservice.getRecipebyId(this.id);
      console.log(this.recipe)
      }
      )
  }

  toShoopingList(){
    this.recipeservice.addIngrediantsToShoppingList(this.recipe.ingrediants);
   
  }

  onEdit(){
this.router.navigate(['edit'],{relativeTo:this.activerouter})
  }

  onDelete(){
    this.recipeservice.DeleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }

}
