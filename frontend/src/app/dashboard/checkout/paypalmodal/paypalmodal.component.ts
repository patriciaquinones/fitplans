import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paypalmodal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paypalmodal.component.html',
  styleUrl: './paypalmodal.component.css'
})
export class PaypalmodalComponent {
  @Input() visible: boolean = false;
  @Input() message: string = '';
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
