import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchedComponent } from './catched.component';

describe('CatchedComponent', () => {
  let component: CatchedComponent;
  let fixture: ComponentFixture<CatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
