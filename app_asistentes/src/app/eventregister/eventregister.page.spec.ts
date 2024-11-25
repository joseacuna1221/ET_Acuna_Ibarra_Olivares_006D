import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventregisterPage } from './eventregister.page';

describe('EventregisterPage', () => {
  let component: EventregisterPage;
  let fixture: ComponentFixture<EventregisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
