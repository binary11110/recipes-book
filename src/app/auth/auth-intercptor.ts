
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest, JsonpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthIntercptor implements HttpInterceptor {
    constructor(private authServ:AuthService){}

        intercept(req:HttpRequest<any>,next:HttpHandler){
           return this.authServ.user.pipe(take(1),
            exhaustMap(user =>{
                if(user.email == '' ){
                    return next.handle(req);
                }
                const reqModfier =req.clone({params: new HttpParams().set('auth',user.token)})
                return next.handle(reqModfier);
            })
            )

        }
    
}
