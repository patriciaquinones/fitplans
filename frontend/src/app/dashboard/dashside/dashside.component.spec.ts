import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashsideComponent } from './dashside.component';

describe('DashsideComponent', () => {
  let component: DashsideComponent;
  let fixture: ComponentFixture<DashsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
