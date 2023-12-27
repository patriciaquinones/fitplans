import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './dashboard/progress/progress.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { PlansComponent } from './dashboard/plans/plans.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, data: { customLayout: false } },
  { path: 'login', component: LoginComponent, data: { customLayout: false } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { customLayout: false },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { customLayout: true },
    children: [
      { path: '', redirectTo: 'progress', pathMatch: 'full' }, // Per default Im redirecting to progress as figma shows
      { path: 'progress', component: ProgressComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'payments', component: PaymentsComponent },
    ],
  },
];
