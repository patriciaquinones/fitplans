import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsChangeModalComponent } from './units-change-modal.component';

describe('UnitsChangeModalComponent', () => {
  let component: UnitsChangeModalComponent;
  let fixture: ComponentFixture<UnitsChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsChangeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitsChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
