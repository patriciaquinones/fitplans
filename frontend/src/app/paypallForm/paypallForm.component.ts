import { Component } from '@angular/core';

@Component({
  selector: 'app-paypallForm',
  templateUrl: './paypallForm.component.html',
  styleUrls: ['./paypallForm.component.css']
})
export class PaypallFormComponent  {
  paymentInfo = {
    cardName: '',
    cardNumber: '',
    // Otros campos del formulario
  };
  constructor() { }

  processPayment() {
    // Lógica para enviar los datos de pago al servidor
    console.log('Datos de pago:', this.paymentInfo);
    // Aquí puedes implementar la lógica para enviar los datos a tu backend
  }




}
