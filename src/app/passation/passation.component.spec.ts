import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassationComponent } from './passation.component';

describe('PassationComponent', () => {
  let component: PassationComponent;
  let fixture: ComponentFixture<PassationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassationComponent]
    });
    fixture = TestBed.createComponent(PassationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
