import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickaddressPage } from './pickaddress.page';

describe('PickaddressPage', () => {
  let component: PickaddressPage;
  let fixture: ComponentFixture<PickaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickaddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
