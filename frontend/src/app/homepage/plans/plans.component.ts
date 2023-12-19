import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css',
})
export class PlansComponent {
  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
