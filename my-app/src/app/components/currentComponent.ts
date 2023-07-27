import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  template: `

  `,
  selector: 'app-your-component'
})
export class CurrentComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit(): void {
    localStorage.setItem('previousUrl', this.location.path());
  }
}
