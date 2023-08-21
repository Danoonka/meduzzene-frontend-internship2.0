import {ChangeDetectorRef, Component,} from '@angular/core';
import {Question, Quiz, QuizInfo} from "../../types/types";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getQuizById} from "../../api/api";
import {deleteQuestionEffects, updateQuizEffects} from "../../../ngRx/healthcheck.effects";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";


@Component({
    selector: 'app-update-quiz-modal',
    templateUrl: './update-quiz-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class UpdateQuizModalComponent {
    quiz_id!: number
    quiz!: Quiz | null
    form!: FormGroup;
    loading = false;
    submitted = false;
    questions: Question[] | [];
    numQuestions: number = 2;

    constructor(
        private formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.questions = []
    }


    ngOnInit(): void {
        this.form = this.formBuilder.group({
            quiz_name: ['', Validators.required],
            quiz_frequency: [0, Validators.required],
        });

        this.route.queryParams.subscribe(params => {
            if (params['quiz_id']) {
                this.quiz_id = params['quiz_id'];
            }
        });

        getQuizById(this.quiz_id).then((res) => {
            this.quiz = res.data.result;
            console.log(this.quiz)
            if (this.quiz) {
                this.questions = this.quiz.question_list;
                this.form.patchValue({
                    quiz_name: this.quiz.quiz_name,
                    quiz_frequency: this.quiz.quiz_frequency
                });
            }
        })
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        const quizData: QuizInfo = {
            quiz_name: this.f['quiz_name'].value,
            quiz_description: '',
            quiz_title: '',
            quiz_frequency: this.f['quiz_frequency'].value,
        };

        updateQuizEffects(this.quiz_id, quizData)
        this.router.navigate(['/company-quiz']);
    }

    onDelete(question_id: number) {
        if (this.questions.length <= 2) {
            return
        }
        deleteQuestionEffects(this.quiz_id, question_id).then(() => {
            getQuizById(this.quiz_id).then((res) => {
                this.quiz = res.data.result;
                if (this.quiz) {
                    this.questions = this.quiz.question_list
                    this.changeDetectorRef.detectChanges();
                    this.form.patchValue({
                        quiz_name: this.quiz.quiz_name,
                        quiz_frequency: this.quiz.quiz_frequency
                    })
                }
            });
        })
    }

    goToPage(page: string, quizId: number, questionId: number) {
        const queryParams: NavigationExtras = {
            queryParams: {
                quiz_id: quizId,
                question_id: questionId,
            },
        };

        this.router.navigate([page], queryParams);
    }

    closeDialog() {
        this.form.reset();
        this.goToPage('/update-quiz', this.quiz_id, 0)
        this.changeDetectorRef.detectChanges();
    }
}
