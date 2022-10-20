import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingrediant } from 'src/app/shared/ingrediants.model';
import { ShoppingService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slfrom!:NgForm;
editMode=false;
editItemIndex !:number;
editIngrediant!:Ingrediant;
  constructor(private shoppingservice:ShoppingService) { }

  ngOnInit(): void {
    this.shoppingservice.editChange.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editItemIndex=index;
        this.editIngrediant = this.shoppingservice.getIngrediant(index);
        this.slfrom.setValue(
          {name:this.editIngrediant.name,
          amount:this.editIngrediant.amount}
        )

      }
     
       )
  }
  onAddedItem(form:NgForm){
const value = form.value;
const newIngrediant = new Ingrediant(value.name , value.amount);
if(this.editMode){
this.shoppingservice.updateIngrediant(this.editItemIndex,newIngrediant)

this.editMode=false;
}
else{this.shoppingservice.addIngrediant(newIngrediant)}


form.reset();
}

onClear(){
  this.slfrom.reset();
  this.editMode=false;
}
onDelete(){
  this.onClear();
  this.shoppingservice.delete(this.editItemIndex);
}

}
