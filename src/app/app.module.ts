import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingService } from './shopping-list/shopping-list.service';

import { RecipesService } from './recipes/recipes.services';

import { AuthIntercptor } from './auth/auth-intercptor';

import { RecipeModule } from './recipes/recipe.module';
import { ShopppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  
    HeaderComponent,
   
     
     
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule,   
    
    
    
    SharedModule,
    
  ],
  providers: [ ShoppingService,RecipesService,{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthIntercptor,
    multi:true
  }],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
