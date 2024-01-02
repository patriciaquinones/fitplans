import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
disabler!: boolean;

constructor(){
  this.disabler = false;
}


ngOnInit(): void {
// this.disabler = false;
}

  onButtonClick() {
    fetch('https://api.paypal.com/v1/payments/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'ECSt0U6gRHWjHJ66NPYRRLCDteDzPY5qBkB0Ghi0QAAgT1o1wg64bDEfT7i9JK6d0dFxopxvD5jnYn7i'
        },
        body: JSON.stringify({
            // Aquí irían los detalles de la transacción
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
  }
}
