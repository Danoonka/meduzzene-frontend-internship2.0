import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Question} from "../../types/types";
import {getQuestionByIdEffects, updateQuestionEffects} from "../../../ngRx/healthcheck.effects";

@Component({
    selector: 'app-update-question-modal',
    templateUrl: './update-question-modal.component.html',
    styleUrls: ['../modal/modal.component.css']
})
export class UpdateQuestionModalComponent {
    @Input() quiz_id!: number
    @Input() question_id!: number
    question!: Question | null;
    form!: FormGroup;
    loading = false;
    submitted = false;


    constructor(
        private formBuilder: FormBuilder
    ) {
    }


    ngOnInit(): void {
        this.form = this.formBuilder.group({
            question_text: ['', Validators.required],
            question_answers: this.formBuilder.array([]), // Initialize FormArray for question answers
            question_correct_answer: [0, Validators.required],
        });

        getQuestionByIdEffects(this.question_id).then((res) => {
            if (res) {
                this.question = res;
                this.form.patchValue({
                    question_text: this.question?.question_text,
                    question_correct_answer: this.question?.question_correct_answer,
                });

                const answersFormArray = this.form.get('question_answers') as FormArray;
                this.question?.question_answers.forEach((answer: string) => {
                    answersFormArray.push(this.formBuilder.control(answer));
                });
            }
        });
    }


    get f() {
        return this.form.controls;
    }

    get questionAnswers() {
        return this.form.get('question_answers') as FormArray;
    }

    onSubmit(){
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        const questionText = this.f['question_text'].value;
        const questionCorrectAnswer = this.f['question_correct_answer'].value;
        const questionAnswers = this.questionAnswers.value;

        let question: Question = {
            question_id: this.question_id,
            question_text: questionText,
            question_answers: questionAnswers,
            question_correct_answer: questionCorrectAnswer
        }
        updateQuestionEffects(this.quiz_id, this.question_id, question).then(()=>{
            this.closeDialog()
        })
    }

    showDialog() {
        let modal = document.getElementById('modal_9')
        modal?.classList.remove('hhidden')
        modal?.classList.add('sshow');
    }

    closeDialog() {
        let modal = document.getElementById('modal_9')
        modal?.classList.remove('sshow')
        modal?.classList.add('hhidden');
    }
}
