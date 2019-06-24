import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesPage } from './pacientes.page';

describe('PacientesPage', () => {
  let component: PacientesPage;
  let fixture: ComponentFixture<PacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
