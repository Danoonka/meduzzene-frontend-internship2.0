import {ChangeDetectorRef, Component} from '@angular/core';
import {Question} from "../../types/types";
import {addQuestionEffects} from "../../../ngRx/healthcheck.effects";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-add-question-modal',
    templateUrl: './add-question-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class AddQuestionModalComponent {
    quiz_id!: number;
    form!: FormGroup;
    question!: { text: string, answers: { text: string, isCorrect: boolean }[] };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {
    }

    AddQuestion = [
        {
            label: 'Question_text',
            name: 'question_text',
            type: 'text'
        },
        {
            label: 'Answer 1',
            name: 'question_answer_1',
            type: 'text'
        },
        {
            label: 'Answer 2',
            name: 'question_answer_2',
            type: 'text'
        },
        {
            label: 'Correct answer',
            name: 'question_correct_answer',
            type: 'number',
            min: 0,
            max: 2
        }
    ]

    ngOnInit() {

        this.form = this.formBuilder.group({
            question_text: ['', Validators.required],
            question_answer_1: ['', Validators.required],
            question_answer_2: ['', Validators.required],
            question_correct_answer: [0, Validators.required],
        });

        this.route.queryParams.subscribe(params => {
            if (params['quiz_id']) {
                this.quiz_id = params['quiz_id'];
            }
        });
    }

    updateAnswerOptions(answerOptions: { text: string, isCorrect: boolean }[]) {
        this.question.answers = answerOptions;

    }

    updateQuestionOptions(questionOption: string) {
        this.question.text = questionOption
    }

    get f() {
        return this.form.controls;
    }


    onSubmit() {
        const answers = [this.f['question_answer_1'].value, this.f['question_answer_2'].value]


        if (answers.length < 2) {
            return
        }
        const new_question: Question = {
            question_text: this.f['question_text'].value,
            question_answers: answers,
            question_correct_answer: this.f['question_correct_answer'].value
        };

        addQuestionEffects(this.quiz_id, new_question).then(() => {
            this.form.reset();
            this.closeDialog()
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

    closeDialog() {
        this.form.reset();
        this.goToPage('/update-quiz', 'quiz_id', this.quiz_id)
        this.changeDetectorRef.detectChanges();
    }
}
