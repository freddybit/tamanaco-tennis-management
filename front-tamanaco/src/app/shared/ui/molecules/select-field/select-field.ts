import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'select-field',
  imports: [ReactiveFormsModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.css',
})
export class SelectField {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly options = input.required<SelectOption[]>();
  readonly placeholder = input<string>('Seleccionar...');
  readonly required = input<boolean>(false);
}
