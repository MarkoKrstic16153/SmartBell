import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreningsComponent } from './trenings.component';

describe('TreningsComponent', () => {
  let component: TreningsComponent;
  let fixture: ComponentFixture<TreningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
