import {Component, Input} from '@angular/core';
import {Question} from "../../types/types";

@Component({
  selector: 'app-question-lines',
  templateUrl: './question-lines.component.html',
  styleUrls: ['./question-lines.component.css']
})
export class QuestionLinesComponent {
    @Input() question!: Question
}
