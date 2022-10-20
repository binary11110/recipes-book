import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 
recipes:Recipe[]=[
 
];
  constructor(private recipeService:RecipesService,
    private router:Router,
    private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.changeRecipe.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe(){
this.router.navigate(['new'] , {relativeTo:this.activeroute})
  }

}
