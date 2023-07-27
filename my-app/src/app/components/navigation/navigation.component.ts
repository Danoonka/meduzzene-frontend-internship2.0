import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {User, userUnAuthorized} from "../../../ngRx/user.actions";
import {UserState} from "../../../ngRx/user.reducer";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  user$: Observable<User | null>;
  public isAuthorized$: Observable<boolean>

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store<{ user: UserState }>) {
    this.isAuthorized$ = this.store.select((state) => state.user.isAuthorized);
    this.user$ = this.store.select((state) => state.user.user);
  }


  LogOut = async () => {
    try {
      // await this.auth.logout();
      localStorage.removeItem('accessToken');
      this.store.dispatch(userUnAuthorized())
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }
}
