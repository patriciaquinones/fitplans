import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { RouterOutlet } from '@angular/router';

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
    private router: Router
  ) { }


  goToCheckout() {

    this.router.navigate(['/dashboard/checkout']);
  }


}
