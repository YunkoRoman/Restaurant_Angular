import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate, CanActivateChild {

  constructor(public AuthService: AuthService,
              public router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): any {

    return this.AuthService.checkUser().pipe(
      map(res => {
        console.log(res);
        if (!res) {
          this.router.navigate(['login']);
          return false
        } else {
          return true
        }

      }),
      catchError((err) => {
        this.router.navigate(['login']);
        return of(false);
      })
    )


  }

  canActivateChild(next: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): any {

    return this.AuthService.checkUser().pipe(
      map(res => {
        console.log(res);
        if (!res) {
          this.router.navigate(['login']);
          return false
        } else {
          return true
        }

      }),
      catchError((err) => {
        this.router.navigate(['login']);
        return of(false);
      })
    )


  }

}
