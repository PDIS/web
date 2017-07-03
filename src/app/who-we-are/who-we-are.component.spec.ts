import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoWeAreComponent } from './who-we-are.component';

describe('WhoWeAreComponent', () => {
  let component: WhoWeAreComponent;
  let fixture: ComponentFixture<WhoWeAreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoWeAreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoWeAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
