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
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
  userName: string = '';

  constructor(
    private planService: PlanService,
    private renderer: Renderer2,
    private authService: AuthService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.planService.planInfo$.subscribe((info) => {
      this.nombrePlan = info.name;
      this.precioPlan = info.price;
    });

    this.authService.getUserName().then((name) => {
      this.userName = name ?? '';
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
        this.openModal(
          'Transacción aprobada ' + this.userName + ', será reedirigido a la pagina de inicio de sessión para que pueda ver los cambios luego del ingreso' 
        );

        // Assuming successful payment, upgrade the user to premium
        const userId = this.authService.getUserId();
        if (userId) {
          this.authService.upgradeToPremium(userId);
          console.log('Se ha actualizado el usuario a premium');
          console.log('isPremium: ' + this.authService.getIsPremium());
          
          //logout the user and redirect to login page after 10 seconds
          setTimeout(() => {
            this.authService.logOut();
            this.routes.navigate(['/login']);
          }, 10000);
        }
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
