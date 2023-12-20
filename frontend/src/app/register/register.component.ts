import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  AuthService=inject(AuthService);

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      validatePass: ['',Validators.required],
      email:['',[Validators.required,Validators. minLength (5)]],
      password: ['', Validators.required]
    })
  }
  onSubmit(){
    console.log(this.registerForm.value);
  }

  // constructor(private router: Router) {}
  // goToLogin() {
  // this.router.navigate(['/login']);
  // }
}
