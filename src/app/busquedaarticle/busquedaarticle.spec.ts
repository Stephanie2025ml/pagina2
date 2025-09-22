import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Busquedaarticle } from './busquedaarticle';

describe('Busquedaarticle', () => {
  let component: Busquedaarticle;
  let fixture: ComponentFixture<Busquedaarticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busquedaarticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Busquedaarticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
