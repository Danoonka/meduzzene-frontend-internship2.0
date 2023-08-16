import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActionState, UserState} from "../../../../../ngRx/user.reducer";
import {Observable, Subscription} from "rxjs";
import {
    acceptInviteEffects, declineActionEffects,
    getCompaniesListForUserEffects,
    getInvitesListForUserEffects
} from "../../../../../ngRx/healthcheck.effects";
import {CompanyForList, User} from "../../../../types/types";

@Component({
    selector: 'app-user-invites-page',
    templateUrl: './user-invites-page.component.html',
    styleUrls: ['./user-invites-page.component.css']
})
export class UserInvitesPageComponent {
    title = "Invites"
    private companySubscription!: Subscription;
    companies$: Observable<CompanyForList[] | []>;
    user$: Observable<User | null>;
    private userSubscription!: Subscription;

    constructor(
        private store: Store<{ action: ActionState }>,
        private userStore: Store<{ user: UserState }>
    ) {
        this.companies$ = this.store.select((state) => state.action.invitesForUser)
        this.user$ = this.userStore.select((state) => state.user.user)

    }

    ngOnInit() {
        if (this.user$) {
            this.userSubscription = this.user$.subscribe((user) => {
                if (user) {
                    getInvitesListForUserEffects(user.user_id, this.store)
                }
            });
        }
    }

    onAccept(action_id: number) {
        acceptInviteEffects(action_id)
            .then(() => {
                this.userSubscription = this.user$.subscribe((user) => {
                    if (user) {
                        getInvitesListForUserEffects(user.user_id, this.store).then(() => {
                            this.companySubscription = this.companies$.subscribe((company) => {
                                return company
                            })
                        })
                    }
                });
            })
    }


    onReject(action_id: number) {
        declineActionEffects(action_id).then(() => {
            this.userSubscription = this.user$.subscribe((user) => {
                if (user) {
                    getInvitesListForUserEffects(user.user_id, this.store).then(() => {
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
