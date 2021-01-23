import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCustomerProductComponent } from './returnCustomerProduct.component';

describe('VerifyOtpComponent', () => {
  let component: ReturnCustomerProductComponent;
  let fixture: ComponentFixture<ReturnCustomerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCustomerProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCustomerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
