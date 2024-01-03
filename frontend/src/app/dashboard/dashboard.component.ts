import { Component } from '@angular/core';
import { DashsideComponent } from './dashside/dashside.component';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [DashsideComponent, RouterOutlet, CommonModule, RouterModule],
})
export class DashboardComponent {
  showSidebar = false;
  menuItems: { link: string; iconPath: string; label: string }[];

  constructor(public sidebarService: SidebarService, private router: Router) {
    this.menuItems = sidebarService.getMenuItems();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
 
  closeSidebar() {
    this.sidebarService.triggerCloseSidebar();
  }
}
