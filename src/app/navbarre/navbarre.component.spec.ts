import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarreComponent } from './navbarre.component';

describe('NavbarreComponent', () => {
  let component: NavbarreComponent;
  let fixture: ComponentFixture<NavbarreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarreComponent]
    });
    fixture = TestBed.createComponent(NavbarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
