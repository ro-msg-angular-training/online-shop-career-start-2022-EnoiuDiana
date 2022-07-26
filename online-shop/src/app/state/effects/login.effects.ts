import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {AuthService} from "../../services/auth.service";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {from, of} from "rxjs";
import {login, loginFailure, loginSuccessful} from "../actions/login.actions";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {Injectable} from "@angular/core";
import {NavigationBarComponent} from "../../navigation-bar/navigation-bar.component";

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        // Call the getProducts method, convert it to an observable
        from(this.authService.login(action.userCredentials)).pipe(
          // Take the returned value and return a new success action containing the products
          map((user) => loginSuccessful({loggedInUser: user})),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loginFailure({error})))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessful),
        tap((action) => {
          this.authService.changeLogInTrue(action.loggedInUser);
          //redirect
          if(this.authService.redirectUrl != null) {
            this.router.navigate([this.authService.redirectUrl]).then();
          } else {
            this.router.navigate([""]).then();
          }
          this.router.navigateByUrl('/show_products').then();
        })
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(() => {
          this.authService.changeLogInFalse();
          alert('Login fail')
        })
      ),
    { dispatch: false }
  );

}
