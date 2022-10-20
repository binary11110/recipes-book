import { NgModule } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Route, Router, RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const routes:Routes=[
    {path:"" ,component:ShoppingListComponent},

]
@NgModule({
    imports:[
        RouterModule.forChild(routes),
        
    ],
    exports:[
           RouterModule
    ]
})

export class ShoppingListRoutingModule{

}