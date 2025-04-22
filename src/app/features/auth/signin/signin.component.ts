import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// import { NzNotificationService } from 'ng-zorro-antd/notification';

import { catchError, EMPTY, take } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { FooterComponent } from '../../../core/layout/footer/footer.component';
import { RegisterService } from '../../../core/services/register.service';
import { Register, UserType } from '../../../core/models/register.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isRegister = false;
  public errorMessage: string | null = null;

  public registerData = {
    name: '',
    email: '',
    cell: '',
    password: '',
    confirmPassword: '',
  };

  public loginData = {
    email: '',
    password: '',
  };

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly registerService: RegisterService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cell: ['', [Validators.required]],
      userType: [UserType.USER, [Validators.required]],
    });
  }

  toggleForm(isRegistering: boolean): void {
    this.isRegister = isRegistering;
  }

  register(): void {
    const { name, email, cell, password } = this.registerForm.value;

    if (!name || !email || !password) {
      // this.notification.create(
      //   'error',
      //   'Erro',
      //   'Todos os campos são obrigatórios.'
      // );
      return;
    }

    const registerPayload: Register = {
      name,
      email,
      cell,
      password,
      userType: UserType.USER, // ou UserType.ADMIN se for um admin
    };

    this.registerService
      .register(registerPayload)
      .pipe(
        take(1),
        catchError((error) => {
          const msg = error?.error?.message || 'Erro ao registrar.';
          // this.notification.create('error', 'Erro no Cadastro', msg);
          return EMPTY;
        })
      )
      .subscribe(() => {
        // this.notification.create(
        //   'success',
        //   'Conta Criada',
        //   'Cadastro realizado com sucesso!'
        // );
        this.toggleForm(false); // volta para o login
      });
  }

  login(): void {
    const formData = this.loginForm.value;

    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .signin(formData)
      .pipe(
        take(1),
        catchError((errorResponse) => {
          const errorMessage = errorResponse.error.message;
          this.errorMessage = errorMessage;

          // this.notification.create(
          //   'error',
          //   'Erro ao realizar login',
          //   errorMessage
          // );

          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response.jwtToken) {
          this.router.navigate(['/']);
        }
      });
  }

  public getErrorMessage(control: string): string {
    const formControl = this.loginForm.get(control);

    if (formControl && (formControl.touched || formControl?.dirty)) {
      if (formControl?.hasError('required')) {
        return 'Campo obrigatório';
      }

      if (formControl?.hasError('email')) {
        return 'Email inválido';
      }
    }

    return '';
  }

  public ngOnInit(): void {}
}
