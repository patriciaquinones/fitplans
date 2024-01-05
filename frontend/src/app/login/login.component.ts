import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, Credential } from '../services/auth.service';
import { inject } from '@angular/core';
import { ButtonProviders } from '../providers/button-providers.component';
import { ToastifyService } from '../services/toastify.service';



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

  // To call it from the form
  async login() {
    const email = this.logInform.value.email || '';
    const password = this.logInform.value.password || '';

    const credential: Credential = {
      email,
      password,
    };

    try {
      if (this.logInform.invalid) {
        this.ToastifyService.showToast('Email o contraseña invalidos');
      } else {
        await this.authService.logInWithEmailAndPassword(credential);
        this.goToDashboard();
      }
    } catch (error) {
      console.log(error);

      this.ToastifyService.showToast('Email o contraseña invalidos');
    }
  }

  constructor(private ToastifyService: ToastifyService) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  //to hide or show the password
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
