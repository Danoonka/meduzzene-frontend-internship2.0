import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input()
  set text(name: string) {
    this.buttonText = name.toUpperCase();
  }
  get name(): string {
    return this.buttonText;
  }

  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;

  public buttonText = '';

  constructor() {}

  onClick() {
    this.btnClick.emit();
  }
}
