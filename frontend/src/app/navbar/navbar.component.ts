import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private SidebarService: SidebarService) {}

  toggleSidebar() {
    this.SidebarService.toggleSidebar();
  }
}
