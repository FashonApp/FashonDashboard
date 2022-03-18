/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SleevehemComponent } from './sleevehem.component';

describe('SleevehemComponent', () => {
  let component: SleevehemComponent;
  let fixture: ComponentFixture<SleevehemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleevehemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleevehemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
