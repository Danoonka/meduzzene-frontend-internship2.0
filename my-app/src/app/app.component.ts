import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environments';
import {Observable} from "rxjs";
import {User, userAuthorized} from "../ngRx/user.actions";
import {Store} from "@ngrx/store";
import {UserState} from "../ngRx/user.reducer";
import {checkAuthEffects} from "../ngRx/healthcheck.effects";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$: Observable<User | null>;
  isAuthorized$: Observable<boolean>;

  constructor(
    private store: Store<{ user: UserState }>,
    public router: Router
  ) {
    this.isAuthorized$ = this.store.select((state) => state.user.isAuthorized);
    this.user$ = this.store.select((state) => state.user.user);
  }

  async ngOnInit(): Promise<void> {
    let userFromStore: User | null = null;
    this.store.select((state) => state.user.user).subscribe((user) => {
      userFromStore = user;
    });

    if (!await checkAuthEffects(this.store)) {
      return;
    }

    this.store.dispatch(userAuthorized());
  }

  title = environment.title;
  apiURL = environment.apiURL;
}
