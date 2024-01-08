import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastifyService } from './services/toastify.service';

export interface MenuItem {
  link: string;
  iconPath: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebarToggled = new EventEmitter<void>();
  closeSidebar = new EventEmitter<void>();

  constructor(private authService: AuthService, private ToastifyService: ToastifyService) {}

  //menu items for dashboard
  menuItems = [
    {
      link: '/dashboard/progress',
      iconPath: '../../assets/icons/home.svg',
      label: 'Inicio',
    },
    {
      link: '/dashboard/search',
      iconPath: '../../assets/icons/search.svg',
      label: 'Buscar',
    },
    {
      link: '/dashboard/plans',
      iconPath: '../../assets/icons/plans.svg',
      label: 'Planes',
    },
    {
      link: '/dashboard/calories',
      iconPath: '../../assets/icons/caloriesIcon.svg',
      label: 'Calorías',
    },
    {
      link: '/dashboard/payments',
      iconPath: '../../assets/icons/payment.svg',
      label: 'Pagos',
    },
    {
      link: '/dashboard/profile',
      iconPath: '../../assets/icons/settings.svg',
      label: 'Perfil',
    },
  ];

  //menu items for homepage, register and login
  navbarItems = [
    { link: '#', iconPath: '../../assets/icons/home.svg', label: 'Inicio' },
    {
      link: '#about',
      iconPath: '../../assets/icons/about.svg',
      label: 'Nosotros',
    },
    {
      link: '#plans',
      iconPath: '../../assets/icons/plans.svg',
      label: 'Precios',
    },
    {
      link: '#contact',
      iconPath: '../../assets/icons/contact.svg',
      label: 'Contacto',
    },
  ];

  getNavbarItems() {
    return this.navbarItems;
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  triggerCloseSidebar() {
    this.closeSidebar.emit();
  }

  async logOut(): Promise<void> {
    // close sidebar
    this.triggerCloseSidebar();
  
    this.ToastifyService.showToast('Cerrando sesión...');
  
    // logout
    await this.authService.logOut();
  }

  getMenuItems(isPremium: boolean): Promise<MenuItem[]> {
    // Return menu items based on the user's premium status
    return new Promise((resolve) => {
      resolve(
        isPremium
          ? this.menuItems
          : this.menuItems.filter((item) => item.label !== 'Calorías')
      );
    });
  }
}
