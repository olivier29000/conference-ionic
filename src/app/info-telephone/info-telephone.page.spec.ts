import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTelephonePage } from './info-telephone.page';

describe('InfoTelephonePage', () => {
  let component: InfoTelephonePage;
  let fixture: ComponentFixture<InfoTelephonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTelephonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTelephonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
