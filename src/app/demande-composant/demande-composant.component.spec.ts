import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeComposantComponent } from './demande-composant.component';

describe('DemandeComposantComponent', () => {
  let component: DemandeComposantComponent;
  let fixture: ComponentFixture<DemandeComposantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeComposantComponent]
    });
    fixture = TestBed.createComponent(DemandeComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
