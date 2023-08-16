import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {CompanyById, QuizList} from "../../types/types";
import {Store} from "@ngrx/store";
import {CompanyState} from "../../../ngRx/user.reducer";
import {deleteQuizEffects} from "../../../ngRx/healthcheck.effects";
import {getAllCompanyQuiz} from "../../api/api";

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
    title = "Quizzes"
    quizzes: QuizList[] | [];
    company$: Observable<CompanyById | null>;
    private companySubscription!: Subscription;


    constructor(
        private companyStore: Store<{ company: CompanyState }>,
    ) {
        this.company$ = this.companyStore.select((state) => state.company.companyById);
        this.quizzes = []
    }


    ngOnInit() {
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
}
