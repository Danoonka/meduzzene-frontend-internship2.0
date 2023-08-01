import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { CompanyById } from "../../../../ngRx/user.actions";
import {CompanyState, UserState} from "../../../../ngRx/user.reducer";
import { Store } from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {deleteCompanyEffects, getCompanyByIdEffects} from "../../../../ngRx/healthcheck.effects";

@Component({
  selector: 'app-company-profile-page',
  templateUrl: './companyProfile.component.html'
})
export class CompanyProfilePage implements OnDestroy {
  title = "Company Profile";
  companyId!: number;
  company$: Observable<CompanyById | null>;
  private companySubscription!: Subscription;
  isCurrentUserOwner: boolean = false;

  constructor(
      private store: Store<{ company: CompanyState }>,
      private route: ActivatedRoute,
      private userStore: Store<{user: UserState}>,
      private router: Router
  ) {
    this.company$ = this.store.select((state) => state.company.companyById);
  }

  ngOnInit() {
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
}
