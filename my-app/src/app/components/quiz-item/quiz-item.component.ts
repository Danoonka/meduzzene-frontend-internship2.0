import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Input() quiz_id!: number;
  @Input() quiz_name!: string;
}
