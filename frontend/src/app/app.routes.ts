import { Routes, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, data: { customLayout: false } },
  { path: 'login', component: LoginComponent, data: { customLayout: false } },
  { path: 'register', component: RegisterComponent, data: { customLayout: false } },
];


