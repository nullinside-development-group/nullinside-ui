import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackgroundWebgl} from './background-webgl';

describe('BackgroundWebgl', () => {
  let component: BackgroundWebgl;
  let fixture: ComponentFixture<BackgroundWebgl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundWebgl]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackgroundWebgl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
