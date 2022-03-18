/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollarComponent } from './collar.component';

describe('CollarComponent', () => {
  let component: CollarComponent;
  let fixture: ComponentFixture<CollarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
