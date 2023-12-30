import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators, FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { error } from 'console';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService=inject(AuthService);

  registerForm= new FormGroup({ 

    firstName: new FormControl <any> ('',Validators.required),
    validatePass: new FormControl <any> ('',Validators.required),
    email:  new FormControl <any> ('',[Validators.required,Validators. minLength (5)]),
    password: new FormControl  <any> ('', Validators.required)


  })


onSubmit(){
  console.log(this.registerForm.value);
  this.authService.signUp(
    this.registerForm.value.email,
    this.registerForm.value.password,
    this.registerForm.get('validatePass')?.value,
    this.registerForm.value.firstName
  ).then((resp:any) => {
    console.log(resp);

  }).catch((error:any) => {
    console.log(error);

  })
}



  //constructor(private formBuilder: FormBuilder) { }


  /*ngOnInit(): void {
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
*/
}
