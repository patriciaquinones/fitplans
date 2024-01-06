import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebarToggled = new EventEmitter<void>();
  closeSidebar = new EventEmitter<void>();

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
    {
      link: '/../../',
      iconPath: '../../assets/icons/logout.svg',
      label: 'Salir',
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

  getMenuItems() {
    return this.menuItems;
  }

  getNavbarItems() {
    return this.navbarItems;
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  triggerCloseSidebar() {
    this.closeSidebar.emit();
  }
}
