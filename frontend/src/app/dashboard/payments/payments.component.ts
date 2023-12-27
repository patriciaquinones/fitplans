import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  //Should be replaced with the actual data from the database
  payments = [
    {
      id: 1,
      name: 'Plan Basico',
      amount: 100,
      status: 'Pagado',
      date: '2021-05-01',
    },
    {
      id: 2,
      name: 'Plan Premium',
      amount: 'RD$1,000',
      status: 'Pagado',
      date: '2021-05-01',
    },
  ];

  //Needs to be implemented
  downloadInvoice() {
    console.log('It works!');
  }
}
