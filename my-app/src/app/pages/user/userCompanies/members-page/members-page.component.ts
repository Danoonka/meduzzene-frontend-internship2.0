import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {
    getUsersListForCompanyEffects,
    getAllAdminsEffects,
    createAdminEffects,
    declineActionEffects,
} from '../../../../../ngRx/healthcheck.effects';
import { ActionState, CompanyState } from '../../../../../ngRx/user.reducer';
import {CompanyById, UserForList} from "../../../../types/types";

@Component({
    selector: 'app-members-page',
    templateUrl: './members-page.component.html',
    styleUrls: ['./members-page.component.css'],
})
export class MembersPageComponent implements OnInit, OnDestroy {
    title = 'Members';
    members$: Observable<UserForList[] | []>;
    company$: Observable<CompanyById | null>;
    admins$: Observable<UserForList[] | []>;

    private companySubscription: Subscription | null = null;
    private membersSubscription: Subscription | null = null;
    private adminsSubscription: Subscription | null = null;

    constructor(
        private store: Store<{ action: ActionState }>,
        private companyStore: Store<{ company: CompanyState }>
    ) {
        this.members$ = this.store.select((state) => state.action.usersForCompany);
        this.company$ = this.companyStore.select((state) => state.company.companyById);
        this.admins$ = this.store.select((state) => state.action.adminsForCompany);
    }

    ngOnInit() {
        this.companySubscription = this.company$
            .pipe(
                switchMap((company) => {
                    if (company) {
                        return this.members$;
                    } else {
                        return EMPTY; // Return an empty observable if company is null
                    }
                }),
                take(1) // Ensure the observable completes after emitting once
            )
            .subscribe((members) => {
            });
    }

    isUserAdmin(userId: number, admins: UserForList[]): boolean {
        return admins.some((admin) => admin.user_id === userId);
    }

    onFire(action_id: number) {
        declineActionEffects(action_id).then(() => {
            this.refreshMembers();
        });
    }

    onMakeAdmin(action_id: number) {
        this.refreshMembers();
        this.companySubscription?.unsubscribe();
        this.companySubscription = this.company$
            .pipe(
                switchMap((company) => {
                    if (company) {
                        createAdminEffects(action_id);
                        getAllAdminsEffects(company.company_id, this.store);
                        return this.members$;
                    } else {
                        return EMPTY;
                    }
                }),
                take(1)
            )
            .subscribe((members) => {
            });
    }

    ngOnDestroy() {
        this.companySubscription?.unsubscribe();
        this.membersSubscription?.unsubscribe();
        this.adminsSubscription?.unsubscribe();
    }

    private refreshMembers() {
        this.companySubscription?.unsubscribe();
        this.companySubscription = this.company$
            .pipe(
                switchMap((company) => {
                    if (company) {
                        getUsersListForCompanyEffects(company.company_id, this.store);
                        getAllAdminsEffects(company.company_id, this.store);
                        return this.members$;
                    } else {
                        return EMPTY;
                    }
                }),
                take(1)
            )
            .subscribe((members) => {
            });
    }
}
