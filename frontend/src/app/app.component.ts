import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlansComponent } from './home/plans/plans.component';
import { TestimonialsComponent } from "./home/testimonials/testimonials.component";
import { HeroComponent } from "./home/hero/hero.component";
import { TeamComponent } from "./home/team/team.component";
import { CtaComponent } from "./home/cta/cta.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        SidebarComponent,
        PlansComponent,
        TestimonialsComponent,
        HeroComponent,
        TeamComponent,
        CtaComponent
    ]
})
export class AppComponent {
  title = 'fitplans';
}
