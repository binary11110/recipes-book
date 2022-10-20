import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable, observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy{
islogInMode = true;
isLoading = false;
error:any = null;
private closesup!:Subscription;
@ViewChild(PlaceholderDirective) alertHost!:PlaceholderDirective;
authObs : Observable<AuthResponseData> = new Observable;
  constructor(private authServ:AuthService 
    ,private router:Router
    ,private compfactoryresolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.islogInMode = ! this.islogInMode;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return
    }
    
     const email = form.value.email;
     const password =form.value.password;
     this.isLoading = true;

    if(this.islogInMode){
     this.authObs = this.authServ.logIn(email,password) 
    }
    else{
      this.authObs= this.authServ.signup(email,password)
      
    } 
    this.authObs.subscribe(
      response =>{
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
       }
       ,errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.shoeErrorAlert(errorMessage);
        this.isLoading = false;
       }

    )
    form.reset()
  }

onHandleError(){
  this.error = null;
}

private shoeErrorAlert(errorMessage:string){

  //we want to create our dynamically alert component

  //give accsess to our component factory(pass the component)
  //it return a factory
  const alertCmpFactory= this.compfactoryresolver.resolveComponentFactory(AlertComponent)
  //we want to tell angular where to add this component in the dom
 //storing a refrence
  const hostViewContainerRef = this.alertHost.viewContainerRef;
  //clear anything that might have been rendered
  hostViewContainerRef.clear();
 //create new component at this place
  const compref =hostViewContainerRef.createComponent(alertCmpFactory);

  //to interact with our comp
  //should have the properties of our component
  compref.instance.message = errorMessage;
 this.closesup= compref.instance.close.subscribe(()=>{
    this.closesup.unsubscribe();
    hostViewContainerRef.clear()
  })
}

ngOnDestroy(): void {
  if(this.closesup){
    this.closesup.unsubscribe();
  }
}

}
