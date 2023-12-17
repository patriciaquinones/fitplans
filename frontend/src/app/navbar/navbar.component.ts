import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [CommonModule, SidebarComponent]
})
export class NavbarComponent {
  constructor(private SidebarService: SidebarService) {}

  toggleSidebar() {
    this.SidebarService.toggleSidebar();
  }
}
