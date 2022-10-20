import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, empty, Observable, Subject, throwError} from 'rxjs';
import { User } from './user.model';
import { getLocaleDateFormat } from '@angular/common';
import { Route, Router } from '@angular/router';

export interface AuthResponseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
  registered?:boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
   private tokenExpirationTimer!:any;
  user = new BehaviorSubject<User>(new User('','','',new Date()));
  constructor(private http:HttpClient,private route:Router) { }

  autoLogin(){
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData') as string)
    if(!userData){
      return;
    }
    const lodedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate) )

    if(lodedUser.token){
      this.user.next(lodedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }
  logout(){
    this.user.next(new User('','','',new Date()))  
    this.route.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDate:number){

   this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
  },expirationDate);
    

  }

  signup(email:string , Password:string):Observable<AuthResponseData>{
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJugvlH8rJvj1pIC0Gm4PwIMjVqMk2ErE',
    { email:email,
      password:Password,
      returnSecureToken:true
    }).pipe(
      catchError(this.handlerError),
      tap((resData) => {
      this.handleAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    })); 
  }

  logIn(email:string , password:string):Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJugvlH8rJvj1pIC0Gm4PwIMjVqMk2ErE', {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      catchError(this.handlerError),
      tap((resDatay )=>{
        this.handleAuth(resDatay.email,resDatay.localId,resDatay.idToken,+resDatay.expiresIn)
      })
    )
    
 }

 handleAuth(email:string,id:string,idToken:string,expiresIn:number){
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email,id,idToken,expirationDate);
  this.user.next(user);
  this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData',JSON.stringify(user));

 }

 handlerError(response:HttpErrorResponse){
  let errorMessage = " error unknown";
  if(!response.error || !response.error.error){
       return throwError(() => new Error(errorMessage) ) ;
  }
  switch(response.error.error.message){
    case 'MISSING_PASSWORD':
      errorMessage = "password is missing"
      break;
    case 'EMAIL_EXISTS':
      errorMessage = "email already exists" 
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = "email doesnt exists" 
      break; 
  }
  return throwError(() => errorMessage) ;
  
 }
}
