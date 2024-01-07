import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PlanService } from '../../services/plan.service';

declare let  paypal: any; // Asegúrate de importar la biblioteca de PayPal

@Component({
  selector: 'app-plans',
  standalone: true,
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css',
  imports:[RouterOutlet, RouterModule]
})
export class PlansComponent  {

  
  constructor(
    private router: Router, private planService: PlanService
  ) { }

  onSelectPlan(name: string, price: number): void {
    this.planService.updatePlanInfo(name, price);
    this.router.navigate(['/dashboard/checkout']);
  }
}
