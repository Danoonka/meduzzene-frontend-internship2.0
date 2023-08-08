import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {CompanyById, CompanyForList, User, UserForList} from "../../../../ngRx/user.actions";
import {ActionState, CompanyState, UserState} from "../../../../ngRx/user.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {
    declineActionEffects,
    deleteCompanyEffects,
    getCompanyByIdEffects,
    getUsersListForCompanyEffects, sendRequestEffects
} from "../../../../ngRx/healthcheck.effects";

@Component({
    selector: 'app-company-profile-page',
    templateUrl: './companyProfile.component.html'
})
export class CompanyProfilePage implements OnDestroy {
    title = "Company Profile";
    companyId!: number;
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;
    members$: Observable<UserForList[] | []>;
    user$: Observable<User | null>;
    private userSubscription!: Subscription;
    isCurrentUserOwner: boolean = false;


    constructor(
        private store: Store<{ company: CompanyState }>,
        private route: ActivatedRoute,
        private userStore: Store<{ user: UserState }>,
        private router: Router,
        private actionStore: Store<{ action: ActionState }>
    ) {
        this.company$ = this.store.select((state) => state.company.companyById);
        this.members$ = this.actionStore.select((state) => state.action.usersForCompany)
        this.user$ = this.userStore.select((state) => state.user.user);
    }

    ngOnInit() {
        getUsersListForCompanyEffects(this.companyId, this.actionStore)
        this.companySubscription = this.route.queryParams.subscribe((params) => {
            this.companyId = params['company_id'];
            getCompanyByIdEffects(this.companyId, this.store);
        });

        this.userStore.select((state) => state.user.user?.user_id).subscribe((currentUserId) => {
            this.company$.subscribe((company) => {
                console.log(currentUserId)
                if (company) {
                    console.log(company)
                    this.isCurrentUserOwner = company.owner_id === currentUserId;
                }
            });
        });
    }

    onSendRequest() {
        this.userSubscription = this.user$.subscribe(user => {
            this.companySubscription = this.company$.subscribe(company => {
                if (user && company) {
                    sendRequestEffects(user.user_id, company.company_id).then(() => {
                        getUsersListForCompanyEffects(this.companyId, this.actionStore)
                    })
                }
            })
        })
    }

    ngOnDestroy() {
        this.companySubscription.unsubscribe();
    }


    onDeleteCompany() {
        if (this.companyId) {
            deleteCompanyEffects(this.companyId).then(() => {
                this.router.navigate(['/company-list']);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    isUserMember(user: User, members: UserForList[]): boolean {
        return members.some(member => member.user_id === user.user_id);
    }

    goToPage(page: string) {
        this.router.navigate([page]);
    }
}
