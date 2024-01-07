import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { PaypalmodalComponent } from './paypalmodal/paypalmodal.component';
import { PlanService } from '../../services/plan.service';
let paypal: any;
@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [PaypalmodalComponent],
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('myPaypalButtons', { static: false })
  paypalButtonsElement!: ElementRef;
  paypal: any;
  visible: boolean = false;
  message: string = '';
  nombrePlan: string = '';
  precioPlan: number = 0;

  constructor(private planService: PlanService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.planService.planInfo$.subscribe((info) => {
      this.nombrePlan = info.name;
      this.precioPlan = info.price;
    });
  }

  ngAfterViewInit(): void {
    const paypalButtons = this.renderer.createElement('div');
    this.renderer.setAttribute(paypalButtons, 'id', 'myPaypalButtons');
    this.renderer.appendChild(
      this.paypalButtonsElement.nativeElement,
      paypalButtons
    );

    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: '59.24',
      onApprove: (details) => {
        this.openModal('Transacción aprobada ' + details.payer.name.given_name);
      },
    });
  }

  openModal(message: string) {
    this.visible = true;
    this.message = message;
  }

  onClose(): void {
    this.visible = false;
  }
}
