import {Component, Input} from '@angular/core';
import {Question, Quiz, QuizInfo} from "../../types/types";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getQuizById} from "../../api/api";
import {deleteQuestionEffects, updateQuizEffects} from "../../../ngRx/healthcheck.effects";


@Component({
    selector: 'app-update-quiz-modal',
    templateUrl: './update-quiz-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class UpdateQuizModalComponent {
    @Input() quiz_id!: number
    quiz!: Quiz | null
    form!: FormGroup;
    loading = false;
    submitted = false;
    questions: Question[] | [];
    numQuestions: number = 2;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.questions = []
    }


    ngOnInit(): void {
        this.form = this.formBuilder.group({
            quiz_name: ['', Validators.required],
            quiz_frequency: [0, Validators.required],
        });

        getQuizById(this.quiz_id).then((res) => {
            this.quiz = res.data;
            if (this.quiz) {
                this.questions = this.quiz.question_list
                this.form.patchValue({
                    quiz_name: this.quiz.quiz_name,
                    quiz_frequency: this.quiz.quiz_frequency
                })
            }
        });
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
    }

    onDelete(question_id: number) {
        if (this.questions.length <= 2){
            return
        }
        deleteQuestionEffects(this.quiz_id, question_id).then(() => {
            getQuizById(this.quiz_id).then((res) => {
                this.quiz = res.data;
                if (this.quiz) {
                    this.questions = this.quiz.question_list
                    this.form.patchValue({
                        quiz_name: this.quiz.quiz_name,
                        quiz_frequency: this.quiz.quiz_frequency
                    })
                }
            });
        })
    }

    showDialog() {
        let modal_t = document.getElementById('modal_8')
        modal_t?.classList.remove('hhidden')
        modal_t?.classList.add('sshow');
    }

    closeDialog() {
        let modal_t = document.getElementById('modal_8')
        modal_t?.classList.remove('sshow')
        modal_t?.classList.add('hhidden');
    }
}
