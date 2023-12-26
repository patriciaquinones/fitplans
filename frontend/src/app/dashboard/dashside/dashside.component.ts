import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashside.component.html',
  styleUrl: './dashside.component.css',
})
export class DashsideComponent implements OnInit {
  sidebarVisible = false;
  menuItems: { link: string; iconPath: string; label: string }[];

  constructor(private SidebarService: SidebarService) {
    this.menuItems = SidebarService.getMenuItems();
  }

  ngOnInit() {
    this.SidebarService.sidebarToggled.subscribe(() => {
      this.sidebarVisible = !this.sidebarVisible;
    });

    this.SidebarService.closeSidebar.subscribe(() => {
      this.sidebarVisible = false;
    });
  }

  closeSidebar() {
    this.SidebarService.triggerCloseSidebar();
  }
}
