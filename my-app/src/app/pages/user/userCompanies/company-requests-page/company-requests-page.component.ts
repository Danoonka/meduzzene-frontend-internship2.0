import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {CompanyById, UserForList} from "../../../../../ngRx/user.actions";
import {Store} from "@ngrx/store";
import {ActionState, CompanyState} from "../../../../../ngRx/user.reducer";
import {
    acceptRequestEffects, declineActionEffects,
    getRequestListForCompanyEffects
} from "../../../../../ngRx/healthcheck.effects";

@Component({
    selector: 'app-company-requests-page',
    templateUrl: './company-requests-page.component.html',
    styleUrls: ['./company-requests-page.component.css']
})
export class CompanyRequestsPageComponent {
    title = "Requests"
    requests$: Observable<UserForList[] | []>;
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;
    companyId!: number;
    private userSubscription!: Subscription;

    constructor(
        private store: Store<{ action: ActionState }>,
        private companyStore: Store<{ company: CompanyState }>,
    ) {
        this.requests$ = this.store.select((state) => state.action.requestsForCompany)
        this.company$ = this.companyStore.select((state) => state.company.companyById);

    }

    ngOnInit() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getRequestListForCompanyEffects(company.company_id, this.store);
            }
        });
    }

    onAccept(action_id: number) {
        acceptRequestEffects(action_id)
            .then(() => {
                this.companySubscription = this.company$.subscribe((company) => {
                    if (company) {
                        getRequestListForCompanyEffects(company.company_id, this.store).then(() => {
                            this.companySubscription = this.requests$.subscribe((company) => {
                                return company
                            })
                        })
                    }
                });
            })
    }


    onReject(action_id: number) {
        declineActionEffects(action_id).then(() => {
            this.companySubscription = this.company$.subscribe((company) => {
                if (company) {
                    getRequestListForCompanyEffects(company.company_id, this.store).then(() => {
                        this.userSubscription = this.requests$.subscribe((company) => {
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
