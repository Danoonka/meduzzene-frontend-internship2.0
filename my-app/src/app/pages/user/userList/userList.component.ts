import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {UserState} from '../../../../ngRx/user.reducer';
import {Observable, Subscription} from 'rxjs';
import {paginationEffects} from '../../../../ngRx/healthcheck.effects';
import {UserForList} from '../../../../ngRx/user.actions';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './userList.component.html',
})
export class UserListPage implements OnInit, OnDestroy {
  currentPage = 1;
  totalPages = 1;
  private userSubscription!: Subscription;
  title = 'User list';
  users$: Observable<UserForList[] | []>;

  constructor(private store: Store<{ user: UserState }>) {
    this.users$ = this.store.select((state) => state.user.users);
  }

  ngOnInit() {
    this.loadPage(this.currentPage);
  }

  prevPage() {
      this.loadPage(this.currentPage - 1)
  }

  nextPage() {
    this.loadPage(this.currentPage + 1);
  }

  loadPage(page: number) {
    paginationEffects('users', this.store, page, 15).then((res) => {
      this.currentPage = res.pagination.current_page;
      this.totalPages = res.pagination.total_page;
      this.userSubscription = this.users$.subscribe((user) => {
        return user
      });
    });
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
