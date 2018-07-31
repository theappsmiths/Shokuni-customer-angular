import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswrdComponent } from './resetpasswrd.component';

describe('ResetpasswrdComponent', () => {
  let component: ResetpasswrdComponent;
  let fixture: ComponentFixture<ResetpasswrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
