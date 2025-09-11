import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMantenimiento } from './app-mantenimiento';

describe('AppMantenimiento', () => {
  let component: AppMantenimiento;
  let fixture: ComponentFixture<AppMantenimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMantenimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMantenimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
