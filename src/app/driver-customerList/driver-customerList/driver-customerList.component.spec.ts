import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCustomerListComponent } from './driver-customerList.component';

describe('VerifyOtpComponent', () => {
  let component: DriverCustomerListComponent;
  let fixture: ComponentFixture<DriverCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
