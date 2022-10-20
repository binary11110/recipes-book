import { Component, OnInit ,OnDestroy} from '@angular/core';
import { provideRoutes } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediants.model';
import { ShoppingService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  
})
export class ShoppingListComponent implements OnInit ,OnDestroy {
ingrediants:Ingrediant[]=[];
private igchangesub!:Subscription;
  constructor(private shoppingservice:ShoppingService) { }

  ngOnInit(): void {
    
    this.ingrediants = this.shoppingservice.getIngrediants()
    this.igchangesub =  this.shoppingservice.ingrediantsChange.subscribe(
(ingrediants:Ingrediant[]) => { this.ingrediants = ingrediants;}
    )
    
  }

  ngOnDestroy(): void {
    this.igchangesub.unsubscribe();
  }

  onEditItem(i:number){
this.shoppingservice.editChange.next(i);
  }

  getIngrediants(){
    
  }


}
