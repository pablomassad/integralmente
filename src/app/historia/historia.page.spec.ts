import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaPage } from './historia.page';

describe('HistoriaPage', () => {
  let component: HistoriaPage;
  let fixture: ComponentFixture<HistoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
