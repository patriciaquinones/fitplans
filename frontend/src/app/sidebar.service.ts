// sidebar.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarToggled = new EventEmitter<void>();
  closeSidebar = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  triggerCloseSidebar() {
    this.closeSidebar.emit();
  }
}
