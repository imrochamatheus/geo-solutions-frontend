import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './configurations.component.html',
})
export class ConfigurationsComponent {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });
  }

  public getFieldError(field: string): string {
    const control = this.form.get(field);
    let errorMessage = '';

    if (!control?.touched || !control?.dirty) {
      return errorMessage;
    }

    if (control?.hasError('required')) {
      errorMessage = 'Campo obrigatório';
    } else if (control?.hasError('email')) {
      errorMessage = 'Deve possuir um e-mail válido';
    }

    return errorMessage;
  }

  public submit() {}
}
