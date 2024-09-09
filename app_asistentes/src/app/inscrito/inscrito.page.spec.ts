import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscritoPage } from './inscrito.page';

describe('InscritoPage', () => {
  let component: InscritoPage;
  let fixture: ComponentFixture<InscritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
