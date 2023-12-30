import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-units-change-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units-change-modal.component.html',
  styleUrl: './units-change-modal.component.css',
})
export class UnitsChangeModalComponent {
  @Input() visible: boolean = false;
  @Input() units: string = 'imperial';
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
