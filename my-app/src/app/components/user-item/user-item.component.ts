import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
    @Input() user_id!: number;
    @Input() user_firstname!: string;
    @Input() user_lastname!: string
}
