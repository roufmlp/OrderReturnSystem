import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOrderDetailsComponent } from './driver-orderDetails.component';

describe('VerifyOtpComponent', () => {
  let component: DriverOrderDetailsComponent;
  let fixture: ComponentFixture<DriverOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
