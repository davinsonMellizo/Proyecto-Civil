import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienzoComponent } from './lienzo.component';

describe('LienzoComponent', () => {
  let component: LienzoComponent;
  let fixture: ComponentFixture<LienzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienzoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
