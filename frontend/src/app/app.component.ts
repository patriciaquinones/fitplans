import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlansComponent } from './homepage/plans/plans.component';
import { TestimonialsComponent } from "./homepage/testimonials/testimonials.component";
import { HeroComponent } from "./homepage/hero/hero.component";
import { TeamComponent } from "./homepage/team/team.component";
import { CtaComponent } from "./homepage/cta/cta.component";
import { AboutComponent } from "./homepage/about/about.component";
import { FaqComponent } from "./homepage/faq/faq.component";
import { FooterComponent } from "./footer/footer.component";

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
        CtaComponent,
        AboutComponent,
        FaqComponent,
        FooterComponent
    ]
})
export class AppComponent {
  title = 'fitplans';
}
