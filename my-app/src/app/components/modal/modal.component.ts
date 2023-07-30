import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    private el: ElementRef
  ) {}



  // close() {
  //   this.el.nativeElement.classList.remove('sshow')
  //   this.el.nativeElement.classList.add('hhidden')
  // }
}
