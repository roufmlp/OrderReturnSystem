import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCustomerListComponent } from './warehouse-customerList.component';

describe('VerifyOtpComponent', () => {
  let component: WarehouseCustomerListComponent;
  let fixture: ComponentFixture<WarehouseCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
