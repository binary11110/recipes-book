import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'src/app/shared/ingrediants.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit ,OnDestroy {
id!:number;
editMode!:boolean;
recipeForm!:FormGroup;
subscribtion!:Subscription;
  constructor(private recipeservice:RecipesService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.subscribtion =this.route.params.subscribe(
      (params:Params)=>{
               this.id = +params['id'];
               this.editMode =params['id'] !=null;
               this.initform();

      }
    )
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  private initform(){
    
    let recipeName ="";
    let recipePath ="";
    let recipeDescription="";
    let recipeIngrediants= new FormArray<FormGroup>([]);
    if(this.editMode){
      const recipe = this.recipeservice.getRecipebyId(this.id);
      
    recipeName = recipe.name;
    recipePath = recipe.imgurl;
    recipeDescription=recipe.description;

    if(recipe['ingrediants']){
      for(let ingrediant of recipe.ingrediants){
        recipeIngrediants.push(
          new FormGroup({
            "name": new FormControl(ingrediant.name,Validators.required),
          "amount": new FormControl(ingrediant.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        )
      }
    }
  
    }
    this.recipeForm = new FormGroup(
      {"name": new FormControl(recipeName,Validators.required),
      "imgpath":new FormControl(recipePath,Validators.required),
      "Description":new FormControl(recipeDescription,Validators.required),
      "ingrediants": recipeIngrediants
    }
    )

  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['Description'],
      this.recipeForm.value['imgpath'],
      this.recipeForm.value['ingrediants'],
    )
    if(this.editMode){
      this.recipeservice.addUpdatedRecipe(this.id,newRecipe)
    }
    else{
      this.recipeservice.addNewRecipe(newRecipe);
    }
    
   this.onCancel();
  }

  onDeleteIngrediants(index:number){
    (this.recipeForm.get('ingrediants') as FormArray).removeAt(index);
  }

  //34an fe error tl3 w7na bnparse al controls bta3t al array
  //get means getter of a property
  get refForm() {
    return (this.recipeForm.get('ingrediants') as FormArray).controls;
                                  
  }

  onAddIngrediants(){
    (this.recipeForm.get('ingrediants') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

 

}
