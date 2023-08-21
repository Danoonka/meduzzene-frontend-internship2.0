import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-answer-component',
    templateUrl: './answer-component.component.html',
    styleUrls: ['./answer-component.component.css']
})
export class AnswerComponentComponent {
    @Input() answerText: string = '';
    @Input() isCorrect: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }
}
