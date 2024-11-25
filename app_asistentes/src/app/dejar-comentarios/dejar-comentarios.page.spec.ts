import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DejarComentariosPage } from './dejar-comentarios.page';

describe('DejarComentariosPage', () => {
  let component: DejarComentariosPage;
  let fixture: ComponentFixture<DejarComentariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DejarComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
