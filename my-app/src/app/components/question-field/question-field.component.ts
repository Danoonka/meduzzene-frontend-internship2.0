import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-question-field',
    templateUrl: './question-field.component.html',
    styleUrls: ['./question-field.component.css']
})
export class QuestionFieldComponent {
    type="text"
    @Input() form!: FormGroup;
    @Input() questionText: string = '';
    @Input() questionIndex: number = 0;
    @Input() answers: { text: string, isCorrect: boolean }[] = [{text: '', isCorrect: false}];
    @Output() answerOptionsChange = new EventEmitter<{ text: string, isCorrect: boolean }[]>();
    @Output() questionOptionsChange = new EventEmitter<string>();


    private emitAnswerOptionsChange() {
        this.answerOptionsChange.emit(this.answers);
        this.questionOptionsChange.emit(this.questionText);
    }

    constructor() {
    }

    ngOnInit(): void {
        this.addAnswer();
    }

    addAnswer() {
        this.answers.push({text: '', isCorrect: false});
        this.emitAnswerOptionsChange();
    }
}
