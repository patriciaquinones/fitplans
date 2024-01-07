import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private planInfoSubject = new BehaviorSubject<{ name: string, price: number }>({ name: 'Plan Gratuito', price: 0 });

  planInfo$ = this.planInfoSubject.asObservable();

  updatePlanInfo(name: string, price: number): void {
    this.planInfoSubject.next({ name, price });
  }
}
