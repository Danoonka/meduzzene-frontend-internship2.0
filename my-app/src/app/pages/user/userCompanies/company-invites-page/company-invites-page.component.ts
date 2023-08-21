import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {ActionState, CompanyState} from "../../../../../ngRx/user.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {
    declineActionEffects,
    getInvitesListForCompanyEffects, getRequestListForUserEffects,
    getUsersListForCompanyEffects
} from "../../../../../ngRx/healthcheck.effects";
import {CompanyById, UserForList} from "../../../../types/types";

@Component({
    selector: 'app-company-invites-page',
    templateUrl: './company-invites-page.component.html',
    styleUrls: ['./company-invites-page.component.css']
})
export class CompanyInvitesPageComponent {
    title = "Invites"
    invites$: Observable<UserForList[] | []>;
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;
    companyId!: number;
    private userSubscription!: Subscription;

    constructor(
        private store: Store<{ action: ActionState }>,
        private companyStore: Store<{ company: CompanyState }>,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.invites$ = this.store.select((state) => state.action.invitesForCompany)
        this.company$ = this.companyStore.select((state) => state.company.companyById);

    }

    ngOnInit() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getInvitesListForCompanyEffects(company.company_id, this.store);
            }
        });
    }

    onDecline(action_id: number) {
        declineActionEffects(action_id).then(() => {
            this.companySubscription = this.company$.subscribe((company) => {
                if (company) {
                    getInvitesListForCompanyEffects(company.company_id, this.store).then(() => {
                        this.userSubscription = this.invites$.subscribe((company) => {
                            return company
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
