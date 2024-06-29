import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinbarreComponent } from './finbarre.component';

describe('FinbarreComponent', () => {
  let component: FinbarreComponent;
  let fixture: ComponentFixture<FinbarreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinbarreComponent]
    });
    fixture = TestBed.createComponent(FinbarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
