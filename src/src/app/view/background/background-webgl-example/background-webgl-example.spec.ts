import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackgroundWebglExample} from './background-webgl-example';

describe('BackgroundWebglExample', () => {
  let component: BackgroundWebglExample;
  let fixture: ComponentFixture<BackgroundWebglExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundWebglExample]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackgroundWebglExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
