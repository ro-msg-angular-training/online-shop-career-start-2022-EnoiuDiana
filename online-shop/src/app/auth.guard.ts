import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const url: string = state.url;

    return this.check(url, route);
  }

  check(url: string, route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      console.log(route.data['roles'])
      if (route.data['roles']) {
        let roles = localStorage.getItem("loggedInRoles")
        return route.data['roles'].some((ai: any) => roles != null && roles.includes(ai));
      } else {
        return true;
      }
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
}
