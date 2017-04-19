/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorklistComponent } from './worklist.component';

describe('WorklistComponent', () => {
  let component: WorklistComponent;
  let fixture: ComponentFixture<WorklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
