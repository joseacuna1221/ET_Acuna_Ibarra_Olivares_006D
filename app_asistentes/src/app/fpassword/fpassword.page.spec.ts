import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FpasswordPage } from './fpassword.page';

describe('FpasswordPage', () => {
  let component: FpasswordPage;
  let fixture: ComponentFixture<FpasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
