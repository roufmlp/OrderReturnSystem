import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserAccessComponent } from './new-userAccess.component';

describe('VerifyOtpComponent', () => {
  let component: NewUserAccessComponent;
  let fixture: ComponentFixture<NewUserAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
