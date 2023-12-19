import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, data: { customLayout: false } },
  { path: 'login', component: LoginComponent, data: { customLayout: false } },
];
