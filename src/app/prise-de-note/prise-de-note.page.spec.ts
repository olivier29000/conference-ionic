import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseDeNotePage } from './prise-de-note.page';

describe('PriseDeNotePage', () => {
  let component: PriseDeNotePage;
  let fixture: ComponentFixture<PriseDeNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriseDeNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriseDeNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
