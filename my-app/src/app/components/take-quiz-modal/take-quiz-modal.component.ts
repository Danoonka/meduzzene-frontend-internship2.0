import {Component} from '@angular/core';
import {CompanyById, Quiz, User} from "../../types/types";
import {getQuizById} from "../../api/api";
import {ActivatedRoute, Router} from "@angular/router";
import {takeQuizEffects} from "../../../ngRx/healthcheck.effects";
import {Observable} from "rxjs";
import {CompanyState, UserState} from "../../../ngRx/user.reducer";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-take-quiz-modal',
    templateUrl: './take-quiz-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class TakeQuizModalComponent {
    quiz_id!: number;
    quiz!: Quiz;
    answers: { [key: string]: string } = {};
    questionButtonStates: { [key: number]: boolean } = {};
    answers_text: { [key: string]: string } = {};
    company$: Observable<CompanyById | null>;
    user$: Observable<User | null>;

    constructor(
        private userStore: Store<{ user: UserState }>,
        private route: ActivatedRoute,
        private companyStore: Store<{ company: CompanyState }>,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.company$ = this.companyStore.select((state) => state.company.companyById)
        this.user$ = this.userStore.select((state) => state.user.user);
    }

    ngOnInit() {
        this.company$ = this.companyStore.select((state) => state.company.companyById)
        this.user$ = this.userStore.select((state) => state.user.user);
        this.route.queryParams.subscribe(params => {
            if (params['quiz_id']) {
                this.quiz_id = params['quiz_id'];
            }
        });
        getQuizById(this.quiz_id).then(res => {
            this.quiz = res.data.result
            console.log(this.quiz)
        })
    }

    onAnswerClick(question_id: number, answer: number) {
        this.answers[`${question_id}`] = `${answer}`
        this.questionButtonStates[question_id] = true;
        let button = document.getElementById(String(`question-${question_id}-answer-${answer}`))
        button?.classList.remove('default')
        button?.classList.add('chosen')
    }

    isButtonDisabled(question_id: number) {
        return this.questionButtonStates[question_id] === true;
    }

    onSubmit() {
        if (Object.keys(this.answers).length === this.quiz.question_list.length) {
            this.company$.subscribe(company => {
                this.user$.subscribe(user => {
                    if (company && user) {
                        takeQuizEffects(company.company_id, user.user_id, this.quiz_id, {answers: this.answers})
                            .then(res => {
                                this.toastr.success(`You result ${(res.right_answers / res.answers) * 100}`, 'Success!', {toastClass: 'custom-toast-success'});
                                this.router.navigate(['/company-profile'], { queryParams: { company_id: company.company_id } });
                            })
                    }
                })
            })
        }
    }
}
