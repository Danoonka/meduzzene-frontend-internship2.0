import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {ActionState, CompanyState} from "../../../../../ngRx/user.reducer";
import {
    declineActionEffects, deleteAdminEffects,
    getAllAdminsEffects,
    getUsersListForCompanyEffects
} from "../../../../../ngRx/healthcheck.effects";
import {CompanyById, UserForList} from "../../../../types/types";

@Component({
    selector: 'app-company-admins-page',
    templateUrl: './company-admins-page.component.html',
    styleUrls: ['./company-admins-page.component.css']
})
export class CompanyAdminsPageComponent {
    title = "Admins"
    admins$: Observable<UserForList[] | []>;
    private userSubscription!: Subscription;
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;

    constructor(
        private store: Store<{ action: ActionState }>,
        private companyStore: Store<{ company: CompanyState }>,
    ) {
        this.company$ = this.companyStore.select((state) => state.company.companyById);
        this.admins$ = this.store.select((state) => state.action.adminsForCompany)
    }


    ngOnInit() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getAllAdminsEffects(company.company_id, this.store)
            }
        });
    }

    onDeleteAdmin(action_id: number) {
        deleteAdminEffects(action_id).then(() => {
            this.userSubscription = this.company$.subscribe(company => {
                if (company) {
                    getAllAdminsEffects(company.company_id, this.store)
                }
            })
        })
    }

    ngOnDestroy() {
        this.companySubscription.unsubscribe();
    }
}
