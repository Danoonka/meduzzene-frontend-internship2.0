import {Component, Input} from '@angular/core';
import {filter, Observable, Subscription} from "rxjs";
import {CompanyById, QuizList} from "../../types/types";
import {Store} from "@ngrx/store";
import {CompanyState} from "../../../ngRx/user.reducer";
import {deleteQuizEffects} from "../../../ngRx/healthcheck.effects";
import {getAllCompanyQuiz} from "../../api/api";
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
    isMember: boolean = false
    isOwner: boolean = false
    title = "Quizzes"
    quizzes: QuizList[] | [];
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;
    private navigationSubscription!: Subscription;


    constructor(
        private companyStore: Store<{ company: CompanyState }>,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.company$ = this.companyStore.select((state) => state.company.companyById);
        this.quizzes = []
        this.navigationSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.refreshQuizzes();
        });
    }


    private refreshQuizzes() {
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getAllCompanyQuiz(company.company_id).then(res => {
                    this.quizzes = res.data.result;
                });
            }
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['isMember'] === 'true') {
                this.isMember = params['isMember'];
            }
            if (params['isOwner'] === 'true') {

                console.log( typeof (params['isOwner'] ))
                this.isOwner = params['isOwner'];
            }
        });

        console.log(this.isMember)
        this.companySubscription = this.company$.subscribe((company) => {
            if (company) {
                getAllCompanyQuiz(company.company_id).then(res => {
                    this.quizzes = res.data.result
                })
            }
        });
    }

    onDelete(quiz_id: number) {
        deleteQuizEffects(quiz_id).then(() => {
            this.companySubscription = this.company$.subscribe((company) => {
                if (company) {
                    getAllCompanyQuiz(company.company_id).then(res => {
                        this.quizzes = res.data.result
                    })
                }
            });
        })
    }

    goToPage(page: string, queryParam: string, queryValue: number) {
        const queryParams: NavigationExtras = {
            queryParams: {
                [queryParam]: queryValue
            }
        };

        this.router.navigate([page], queryParams);
    }


}
