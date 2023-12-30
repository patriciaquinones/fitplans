import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators, FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  constructor(private router: Router) {}
  goToRegister() {
    this.router.navigate(['/register']);
  }

  authService=inject(AuthService);

  loginForm= new FormGroup({ 

    email:  new FormControl <any> ('',[Validators.required,Validators. minLength (5)]),
    password: new FormControl  <any> ('', Validators.required)


  })

onSubmit(){
  console.log(this.loginForm.value);
    this.authService.signIn(
    this.loginForm.value.email,
    this.loginForm.value.password,
  ).then((resp:any) => {
    console.log(resp);

  }).catch((error:any) => {
    console.log(error);

  })
}


}
