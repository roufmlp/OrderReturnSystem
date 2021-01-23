import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceOrderDetailsComponent } from './finance-orderDetails.component';

describe('VerifyOtpComponent', () => {
  let component: FinanceOrderDetailsComponent;
  let fixture: ComponentFixture<FinanceOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
