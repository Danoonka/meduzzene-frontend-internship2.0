import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyById, Question, Quiz} from "../../types/types";
import {createQuizEffects} from "../../../ngRx/healthcheck.effects";
import {Store} from "@ngrx/store";
import {CompanyState} from "../../../ngRx/user.reducer";
import {Observable} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";


@Component({
    selector: 'app-create-quiz-modal',
    templateUrl: './create-quiz-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class CreateQuizModalComponent {
    company$: Observable<CompanyById | null>;
    form!: FormGroup;
    loading = false;
    submitted = false;
    type = 'text'
    typeNumber = 'number'
    numQuestions: number = 2;
    questions: { text: string, answers: { text: string, isCorrect: boolean }[] }[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<{ company: CompanyState }>,
        private router: Router,
    ) {
        this.company$ = this.store.select((state) => state.company.companyById);
    }

    ngOnInit(): void {
        this.addQuestions();
        this.form = this.formBuilder.group({
            quizName: ['', Validators.required],
            Frequency: [1, Validators.required],
        });
    }

    get f() {
        return this.form.controls;
    }

    addQuestion() {
        this.questions.push({text: '', answers: []});
    }


    addQuestions() {
        for (let i = 0; i < this.numQuestions; i++) {
            this.addQuestion();
        }
    }

    updateAnswerOptions(questionIndex: number, answerOptions: { text: string, isCorrect: boolean }[]) {
        this.questions[questionIndex].answers = answerOptions;

    }

    updateQuestionOptions(questionIndex: number, questionOption: string) {
        this.questions[questionIndex].text = questionOption
    }

    onSubmit() {
        const questionList: Question[] = this.questions.map(question => {
            const answers = question.answers.map(answer => answer.text);
            const correctAnswerIndex = question.answers.findIndex(answer => answer.isCorrect);

            if (question.text === '' || correctAnswerIndex === -1 || answers.some(answer => answer === '')) {
                return null;
            }

            if (answers.length < 2) {
                return null
            }
            return {
                question_text: question.text,
                question_answers: answers,
                question_correct_answer: correctAnswerIndex
            };
        }).filter(question => question !== null) as Question[];


        const quizData: Quiz = {
            quiz_name: this.f['quizName'].value,
            quiz_frequency: this.f['Frequency'].value,
            question_list: questionList
        };

        if (quizData.question_list.length < 2) {
            return
        }

        this.company$.subscribe((company) => {
            if (company) {
                createQuizEffects(company.company_id, quizData)
            }
        })
        this.form.reset();
        this.questions.forEach((question) => {
            question.text = '';
            question.answers = [{text: '', isCorrect: false}];
        });
        this.closeDialog()
    }


    showDialog() {
        this.form.reset();
        let modal_t = document.getElementById('modal_7')
        modal_t?.classList.remove('hhidden')
        modal_t?.classList.add('sshow');
    }


    closeDialog() {
        let modal_t = document.getElementById('modal_7')
        modal_t?.classList.remove('sshow')
        modal_t?.classList.add('hhidden');
    }
}
