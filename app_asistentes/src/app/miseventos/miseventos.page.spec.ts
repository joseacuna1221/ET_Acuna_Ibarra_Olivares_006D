import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiseventosPage } from './miseventos.page';

describe('MiseventosPage', () => {
  let component: MiseventosPage;
  let fixture: ComponentFixture<MiseventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
