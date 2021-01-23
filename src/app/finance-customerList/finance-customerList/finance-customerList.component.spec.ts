import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCustomerListComponent } from './finance-customerList.component';

describe('VerifyOtpComponent', () => {
  let component: FinanceCustomerListComponent;
  let fixture: ComponentFixture<FinanceCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
