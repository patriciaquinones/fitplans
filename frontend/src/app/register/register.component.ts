import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { NgIf } from '@angular/common';
import { ToastifyService } from '../services/toastify.service';

interface SignUpForm {
  firstName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  hide = true;
  formBuilder = inject(FormBuilder);
  buttonProviders = new ButtonProviders();

  registerForm: FormGroup<SignUpForm> = this.formBuilder.group({
    firstName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  private authService = inject(AuthService);

  async signUp(): Promise<void> {
    try {
      const credential: Credential = {
        email: this.registerForm.get('email')?.value ?? '',
        password: this.registerForm.get('password')?.value ?? '',
        firstName: this.registerForm.get('firstName')?.value ?? '',
      };

      if (
        this.registerForm.get('email')?.hasError('email') ||
        credential.password == '' ||
        credential.firstName == ''
      ) {
        this.ToastifyService.showToast(
          'Verifique los datos ingresados e intente nuevamente.'
        );
        return;
      } else {
        this.ToastifyService.showToast('Usuario registrado correctamente.');
        await this.authService.signUpWithEmailAndPassword(credential);
        this.router.navigate(['/login']);
      }      
    } catch (error) {
      console.log(error);
      this.ToastifyService.showToast(
        'Ocurrio un error al registrar el usuario, intente más tarde'
      );
    }
  }

  // To call it from the button
  async signInWithGoogle(): Promise<void> {
    try {
      await this.buttonProviders.signUpWithGoogle();
    } catch (error) {
      console.log(error);
      this.ToastifyService.showToast(
        'Ocurrio un error al iniciar sesion con Google, intente más tarde'
      );
    }
  }

  constructor(
    private router: Router,
    private ToastifyService: ToastifyService
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  //to hide or show the password
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
