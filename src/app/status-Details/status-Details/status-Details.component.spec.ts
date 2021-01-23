import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDetailsComponent } from './status-Details.component';

describe('VerifyOtpComponent', () => {
  let component: StatusDetailsComponent;
  let fixture: ComponentFixture<StatusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
