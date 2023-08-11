import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActionState, CompanyState} from "../../../../../ngRx/user.reducer";
import {Observable, Subscription} from "rxjs";
import {CompanyById, UserForList} from "../../../../../ngRx/user.actions";
import {
    createAdminEffects,
    declineActionEffects, getAllAdminsEffects,
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
    private adminsSubscription!: Subscription;
    companyId!: number;
    private userSubscription!: Subscription;
    admins$: Observable<UserForList[] | []>;

    constructor(
        private store: Store<{ action: ActionState }>,
        private companyStore: Store<{ company: CompanyState }>,
    ) {
        this.members$ = this.store.select((state) => state.action.usersForCompany)
        this.company$ = this.companyStore.select((state) => state.company.companyById);
        this.admins$ = this.store.select((state) => state.action.adminsForCompany)
    }

    ngOnInit() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getUsersListForCompanyEffects(company.company_id, this.store);
                getAllAdminsEffects(company.company_id, this.store)
            }
        });
    }

    isUserAdmin(userId: number, admins: UserForList[]): boolean {
        return admins.some(admin => admin.user_id === userId);
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

    onMakeAdmin(action_id: number) {
        this.companySubscription = this.company$.subscribe((company) => {
            this.adminsSubscription = this.members$.subscribe(() => {
                if (company) {
                    createAdminEffects(action_id)
                    getAllAdminsEffects(company.company_id, this.store)
                    getUsersListForCompanyEffects(company.company_id, this.store)
                }
            })

        });
    }

    ngOnDestroy() {
        this.companySubscription.unsubscribe();
    }
}
