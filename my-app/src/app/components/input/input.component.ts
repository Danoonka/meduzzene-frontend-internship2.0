import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent {
    @Input() label!: string;
    @Input() control!: AbstractControl | null;
    @Input() type!: string;
    @Input() min?: number
    @Input() max?: number

    get isFormControl(): boolean {
        return this.control instanceof FormControl;
    }

    get formControl(): FormControl | null {
        return this.isFormControl ? this.control as FormControl : null;
    }
}
