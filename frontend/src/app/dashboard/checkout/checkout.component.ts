import { Component } from "@angular/core";
import { render } from "creditcardpayments/creditCardPayments";
let paypal: any;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})

export class CheckoutComponent {
  constructor() {
    render(
      {
        id: "#myPaypalButtons",
        currency: "USD",
        value: "100.00",
        onApprove: (details) => {
          alert("Transaction successfull");
        },
      }
    );
  }
}
