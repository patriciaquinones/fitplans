import { Component } from '@angular/core';
import { DashsideComponent } from './dashside/dashside.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [DashsideComponent, RouterOutlet, CommonModule, RouterModule],
})
export class DashboardComponent {
  showSidebar = false;
  menuItems: { link: string; iconPath: string; label: string }[] = [];
  isLoading: boolean = false;
  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    const userData = this.route.snapshot.data['user'];
    this.loadMenuItems();
  }

  async loadMenuItems() {
    const isPremium = await this.authService.getIsPremium();

    // Get menu items based on the user's premium status
    this.menuItems = await this.sidebarService.getMenuItems(isPremium);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  closeSidebar() {
    this.sidebarService.triggerCloseSidebar();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
