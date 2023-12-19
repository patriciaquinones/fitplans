import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";

interface MyRouteData {
  customLayout?: boolean;
}
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, FooterComponent, NavbarComponent, RouterOutlet]
})
export class AppComponent {
  title = 'fitplans';

  useCustomLayout: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.root;
        this.useCustomLayout = (currentRoute.firstChild?.data as MyRouteData)?.customLayout ?? false;
      }
    });
  }
}
