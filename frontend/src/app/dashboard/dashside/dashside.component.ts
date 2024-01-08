import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashside.component.html',
  styleUrl: './dashside.component.css',
})
export class DashsideComponent implements OnInit {
  sidebarVisible = false;
  menuItems: { link: string; iconPath: string; label: string }[] = [];
  constructor(private SidebarService: SidebarService, private authService: AuthService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.SidebarService.sidebarToggled.subscribe(() => {
      this.sidebarVisible = !this.sidebarVisible;
    });
  
    this.SidebarService.closeSidebar.subscribe(() => {
      this.sidebarVisible = false;
    });
  
    this.loadMenuItems();
  }

  async loadMenuItems() {
    const isPremium = await this.authService.getIsPremium();

    // Get menu items based on the user's premium status
    this.menuItems = await this.SidebarService.getMenuItems(isPremium);
  }
  
  closeSidebar() {
    this.SidebarService.triggerCloseSidebar();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
