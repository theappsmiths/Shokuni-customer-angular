import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourprofileComponent } from './yourprofile.component';

describe('YourprofileComponent', () => {
  let component: YourprofileComponent;
  let fixture: ComponentFixture<YourprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
