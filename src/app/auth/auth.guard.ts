import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:"root"})


export class AuthGuard implements CanActivate{

    constructor(private authserv:AuthService ,private route:Router){
    
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |Observable<boolean| UrlTree> | Promise<boolean> {
        return this.authserv.user.pipe(take(1),map(user=>{
            const isAuth = user.email == ''? false:true;                    ///create auth tree to rout to another route if the user isnot authenticated
            if(isAuth){
               return true;
            }
            else{
                return this.route.createUrlTree(['/auth']);
            }
        }  ))
    }
}

