import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {CompanyById, UserForList} from "../../../ngRx/user.actions";
import {ActionState, CompanyState, UserState} from "../../../ngRx/user.reducer";
import {Store} from "@ngrx/store";
import {
    getInvitesListForCompanyEffects,
    getUsersListForCompanyEffects,
    inviteUserEffects,
    paginationForUserListEffects,
} from "../../../ngRx/healthcheck.effects";

@Component({
    selector: 'app-send-invite-modal',
    templateUrl: './send-invite-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class SendInviteModalComponent {
    loading = false;
    submitted = false;
    company$: Observable<CompanyById | null>
    users$: Observable<UserForList[] | []>
    private userSubscription!: Subscription;
    private companySubscription!: Subscription;
    candidates: UserForList[] = [];
    members$: Observable<UserForList[] | []>
    private memberSubscription!: Subscription;
    invites$: Observable<UserForList[] | []>
    private invitesSubscription!: Subscription

    constructor(
        private actionStore: Store<{ action: ActionState }>,
        private userStore: Store<{ user: UserState }>,
        private companyStore: Store<{ company: CompanyState }>
    ) {
        this.company$ = this.companyStore.select((state) => state.company.companyById)
        this.users$ = this.userStore.select((state) => state.user.users)
        this.members$ = this.actionStore.select(state => state.action.usersForCompany)
        this.invites$ = this.actionStore.select(state => state.action.invitesForCompany)
    }

    ngOnInit() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getUsersListForCompanyEffects(company.company_id, this.companyStore)
                paginationForUserListEffects(this.userStore, 1, 5000)
                getInvitesListForCompanyEffects(company.company_id, this.companyStore)
                this.userSubscription = this.users$.subscribe(users => {
                    this.memberSubscription = this.members$.subscribe(members => {
                        this.invitesSubscription = this.invites$.subscribe(sub => {
                            const invId = sub.map(user => user.user_id)
                            const memberIds = members.map(member => member.user_id);
                            this.candidates = users.filter(user => !memberIds.includes(user.user_id) && !invId.includes(user.user_id));
                        })
                    })
                })
            }
        })
    }

    onSendInvite(user_id: number) {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                inviteUserEffects(user_id, company.company_id)
                getUsersListForCompanyEffects(company.company_id, this.companyStore)
                paginationForUserListEffects(this.userStore, 1, 5000)
                getInvitesListForCompanyEffects(company.company_id, this.companyStore)
                this.userSubscription = this.users$.subscribe(users => {
                    this.memberSubscription = this.members$.subscribe(members => {
                        this.invitesSubscription = this.invites$.subscribe(sub => {
                            const invId = sub.map(user => user.user_id)
                            const memberIds = members.map(member => member.user_id);
                            this.candidates = users.filter(user => !memberIds.includes(user.user_id) && !invId.includes(user.user_id));
                        })
                    })
                })
            }
        })


    }

    showDialog() {
        let modal_t = document.getElementById('modal_6')
        modal_t?.classList.remove('hhidden')
        modal_t?.classList.add('sshow');
    }

    closeDialog() {
        let modal_t = document.getElementById('modal_6')
        modal_t?.classList.remove('sshow')
        modal_t?.classList.add('hhidden');
    }
}
