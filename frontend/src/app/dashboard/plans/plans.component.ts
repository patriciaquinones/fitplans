import { Component, OnInit } from '@angular/core';

declare let  paypal: any; // Asegúrate de importar la biblioteca de PayPal

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  renderPaypalButton(): void {
    paypal.Buttons({
      createOrder: function(data: any, actions: any) {
        // Set up the transaction
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '100.00'
            }
          }]
        });
      },
      onApprove: function(data: any, actions: any) {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details: any) {
          // Show a success message to the buyer
          alert('Transaccion realizada con exito');
        });
      }
    }).render('#paypal-button-container');
  }
}
