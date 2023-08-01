import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent {
  @Input() company_id!: number;
  @Input() company_name!: string;
}
