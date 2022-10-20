import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrediant } from '../shared/ingrediants.model';

export class ShoppingService{
    ingrediantsChange = new Subject<Ingrediant[]>();
    editChange= new Subject<number>();
    private ingrediants:Ingrediant[]=[
        new Ingrediant('apples',5),
        new Ingrediant('tommatoes',5)
      ];

      getIngrediants(){
        return this.ingrediants.slice();
      }
      getIngrediant(index:number){
        return this.ingrediants[index];
      }
      addIngrediant(ingrediant:Ingrediant){
        
       this.ingrediants.push(ingrediant);
       this.ingrediantsChange.next(this.ingrediants.slice())
      }
      updateIngrediant(index:number,updateIngrediant:Ingrediant){
        this.ingrediants[index] = updateIngrediant;
        this.ingrediantsChange.next(this.ingrediants.slice())
      }
      delete(index:number){
        this.ingrediants.splice(index,1);
        this.ingrediantsChange.next(this.ingrediants.slice());
      }
      addToshoppingList(ingrediant:Ingrediant[]){
        this.ingrediants.push(...ingrediant);
        this.ingrediantsChange.next(this.ingrediants.slice());
      }
}