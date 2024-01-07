import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalmodalComponent } from './paypalmodal.component';

describe('PaypalmodalComponent', () => {
  let component: PaypalmodalComponent;
  let fixture: ComponentFixture<PaypalmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypalmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaypalmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
