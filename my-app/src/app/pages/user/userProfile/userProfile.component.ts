import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {setUser, userUnAuthorized} from '../../../../ngRx/user.actions';
import {Store} from '@ngrx/store';
import {UserState} from '../../../../ngRx/user.reducer';
import {
    deleteUserEffects,
    getUserByIdEffects,
} from '../../../../ngRx/healthcheck.effects';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../../types/types";

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './userProfile.component.html'
})
export class UserProfilePage implements OnInit, OnDestroy {
    user$: Observable<User | null>;
    userId!: number | undefined;
    private userSubscription!: Subscription;
    userById$: Observable<User | null>;
    title = 'User profile';

    constructor(
        private store: Store<{ user: UserState }>,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.userById$ = this.store.select((state) => state.user.userById);
        this.user$ = this.store.select((state) => state.user.user);
    }

    ngOnInit() {
        this.userSubscription = this.route.queryParams.subscribe((params) => {
            this.userId = params['user_id'];
            this.user$.subscribe((user) => {
                if (user) {
                    getUserByIdEffects(this.userId ? this.userId : user.user_id, this.store);
                }
            })
        });

        this.userSubscription = this.userById$.subscribe((user) => {
            return user
        });
    }

    onDelete() {
        this.user$.subscribe((user) => {
            if (user) {
                deleteUserEffects(user.user_id).then(() => {
                    this.store.dispatch(setUser({user: null}));
                    this.store.dispatch(userUnAuthorized())
                    localStorage.removeItem('accessToken');
                    this.router.navigate(['/user-authorization'])
                })
            }
        })
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    goToPage(page: string) {
        this.router.navigate([page]);
    }
}
