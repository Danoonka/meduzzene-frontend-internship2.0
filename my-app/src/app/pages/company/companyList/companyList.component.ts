import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CompanyState} from "../../../../ngRx/user.reducer";
import {paginationForCompanyList} from "../../../../ngRx/healthcheck.effects";
import {CompanyForList} from "../../../types/types";

@Component({
  selector: 'app-company-list-page',
  templateUrl: './companyList.component.html'
})
export class CompanyListPage implements OnInit, OnDestroy{
  title="Company List"
  currentPage = 1;
  totalPages = 1;
  private companySubscription!: Subscription;
  companies$: Observable<CompanyForList[] | []>;

  constructor(private store: Store<{ company: CompanyState }>) {
    this.companies$ = this.store.select((state) => state.company.companies);
  }

  ngOnInit() {
    this.loadPage(this.currentPage);
  }

  prevPage() {
    this.loadPage(this.currentPage - 1)
  }

  nextPage() {
    this.loadPage(this.currentPage + 1);
  }

  loadPage(page: number) {
    paginationForCompanyList(this.store, page, 15).then((res) => {
      this.currentPage = res.pagination.current_page;
      this.totalPages = res.pagination.total_page;
      this.companySubscription = this.companies$.subscribe((company) => {
        console.log(company)
      });
    });
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }
}
