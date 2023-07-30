import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {UserState} from "../ngRx/user.reducer";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthorized$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.isAuthorized$ = this.store.select((state) => state.user.isAuthorized);
  }

  canActivate(): Observable<boolean> {
    return this.isAuthorized$.pipe(
      map((isAuthorized: boolean) => {
          if (isAuthorized) {
            return true; // User is authorized, allow access to the route.
          } else {
            const previousUrl = localStorage.getItem('previousUrl');

            if (previousUrl) {
              localStorage.removeItem('previousUrl');

              this.router.navigateByUrl(previousUrl);
            } else {
              // this.router.navigate(['/']);
            }
          }
          return false;
        }
      )
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardForUnauthorised implements CanActivate {
  isAuthorized$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.isAuthorized$ = this.store.select((state) => state.user.isAuthorized);
  }

  canActivate(): Observable<boolean> {
    return this.isAuthorized$.pipe(
      map((isAuthorized: boolean) => {
        if (!isAuthorized) {
          return true;
        } else {
          const previousUrl = localStorage.getItem('previousUrl');

          if (previousUrl) {
            localStorage.removeItem('previousUrl');

            this.router.navigateByUrl(previousUrl);
          } else {
            // this.router.navigate(['/']);
          }
          return false;
        }
      })
    );
  }
}



