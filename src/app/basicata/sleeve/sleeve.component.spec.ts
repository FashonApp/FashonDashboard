/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SleeveComponent } from './sleeve.component';

describe('SleeveComponent', () => {
  let component: SleeveComponent;
  let fixture: ComponentFixture<SleeveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleeveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleeveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
