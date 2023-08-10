import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActionState, CompanyState} from "../../../../../ngRx/user.reducer";
import {Observable, Subscription} from "rxjs";
import {CompanyById, UserForList} from "../../../../../ngRx/user.actions";
import {
    declineActionEffects,
    getUsersListForCompanyEffects
} from "../../../../../ngRx/healthcheck.effects";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-members-page',
    templateUrl: './members-page.component.html',
    styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent {
    title = "Members"
    members$: Observable<UserForList[] | []>;
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;
    companyId!: number;
    private userSubscription!: Subscription;

    constructor(
        private store: Store<{ action: ActionState }>,
        private companyStore: Store<{ company: CompanyState }>,
    ) {
        this.members$ = this.store.select((state) => state.action.usersForCompany)
        this.company$ = this.companyStore.select((state) => state.company.companyById);

    }

    ngOnInit() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getUsersListForCompanyEffects(company.company_id, this.store);
            }
        });
    }

    onFire(action_id: number) {
        declineActionEffects(action_id).then(() => {
            this.companySubscription = this.company$.subscribe((company) => {
                if (company) {
                    getUsersListForCompanyEffects(company.company_id, this.store).then(() => {
                        this.userSubscription = this.members$.subscribe((members) => {
                            return members
                        })
                    })
                }
            });
        })
    }

    ngOnDestroy() {
        this.companySubscription.unsubscribe();
    }
}
