import { Component, Injectable, OnInit } from '@angular/core';
import { MenuItem, SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarVisible = false;
  isPremiumUser: boolean = false;

  navbarItems: MenuItem[];

  constructor(
    private SidebarService: SidebarService,
    private authService: AuthService
  ) {
    this.navbarItems = SidebarService.getNavbarItems();
  }

  ngOnInit() {
    this.SidebarService.sidebarToggled.subscribe(() => {
      this.sidebarVisible = !this.sidebarVisible;
    });

    this.SidebarService.closeSidebar.subscribe(() => {
      this.sidebarVisible = false;
    });

    // Check user's premium status
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getIsPremium().then(async (isPremium) => {
        this.isPremiumUser = isPremium;

        // Get menu items based on the user's premium status
        this.navbarItems = await this.SidebarService.getMenuItems(
          this.isPremiumUser
        );
      });
    }
  }

  closeSidebar() {
    this.SidebarService.triggerCloseSidebar();
  }

  isItemVisible(sidebarItem: MenuItem): boolean {
    //return all the items if the user is premium if not return only the free items
    if (this.isPremiumUser) {
      return true;
    } else {
      return sidebarItem.label !== 'Calorías';
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
