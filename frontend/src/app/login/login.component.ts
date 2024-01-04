import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, Credential } from '../services/auth.service';
import { inject } from '@angular/core';
import { ButtonProviders } from '../providers/button-providers.component';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  formBuilder = inject(FormBuilder);
  buttonProviders = new ButtonProviders();

  private authService = inject(AuthService);
  private router = inject(Router);

  logInform: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  
  // To call it from the button
  async signInWithGoogle(): Promise<void> {
    try {
      await this.buttonProviders.signUpWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

  get isEmailValid(): string | boolean {
    const control = this.logInform.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }
  async logIn(): Promise<void> {
    if (this.logInform.invalid) return;

    const credential: Credential = {
      email: this.logInform.value.email || '',
      password: this.logInform.value.password || '',
    };

    try {
      await this.authService.logInWithEmailAndPassword(credential);

      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  constructor() {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
