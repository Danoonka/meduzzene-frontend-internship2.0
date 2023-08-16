import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {ActionState, UserState} from "../../../../../ngRx/user.reducer";
import {
    declineActionEffects, getCompaniesListForUserEffects,
    getInvitesListForUserEffects,
    getRequestListForUserEffects
} from "../../../../../ngRx/healthcheck.effects";
import {CompanyForList, User} from "../../../../types/types";

@Component({
    selector: 'app-user-rrquests-page',
    templateUrl: './user-requests-page.component.html',
    styleUrls: ['./user-requests-page.component.css']
})
export class UserRequestsPageComponent {
    title = "Requests"
    private companySubscription!: Subscription;
    companies$: Observable<CompanyForList[] | []>;
    user$: Observable<User | null>;
    private userSubscription!: Subscription;

    constructor(
        private store: Store<{ action: ActionState }>,
        private userStore: Store<{ user: UserState }>
    ) {
        this.companies$ = this.store.select((state) => state.action.requestsForUser)
        this.user$ = this.userStore.select((state) => state.user.user)

    }

    ngOnInit() {
        if (this.user$) {
            this.userSubscription = this.user$.subscribe((user) => {
                if (user) {
                    getRequestListForUserEffects(user.user_id, this.store)
                }
            });
        }
    }

    onDecline(action_id: number) {
        declineActionEffects(action_id).then(() => {
            this.userSubscription = this.user$.subscribe((user) => {
                if (user) {
                    getRequestListForUserEffects(user.user_id, this.store).then(() => {
                        this.companySubscription = this.companies$.subscribe((company) => {
                            return company
                        })
                    })
                }
            });
        })
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
