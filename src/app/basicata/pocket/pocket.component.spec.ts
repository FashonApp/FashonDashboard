/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PocketComponent } from './pocket.component';

describe('PocketComponent', () => {
  let component: PocketComponent;
  let fixture: ComponentFixture<PocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
