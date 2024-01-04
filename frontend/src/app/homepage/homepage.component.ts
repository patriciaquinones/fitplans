import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { CtaComponent } from './cta/cta.component';
import { TeamComponent } from './team/team.component';
import { PlansComponent } from './plans/plans.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HeroComponent } from './hero/hero.component';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [
    AboutComponent,
    FaqComponent,
    CtaComponent,
    TeamComponent,
    PlansComponent,
    TestimonialsComponent,
    HeroComponent,
  ],
})
export class HomepageComponent {
  constructor(public sidebarService: SidebarService) {}

  closeSidebar() {
    this.sidebarService.triggerCloseSidebar();
  }
}
