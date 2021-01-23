import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrederReturnComponent } from './new-orederReturn.component';

describe('VerifyOtpComponent', () => {
  let component: NewOrederReturnComponent;
  let fixture: ComponentFixture<NewOrederReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrederReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrederReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
