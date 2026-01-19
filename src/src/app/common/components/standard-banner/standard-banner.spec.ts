import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StandardBanner} from './standard-banner';

describe('StandardBanner', () => {
  let component: StandardBanner;
  let fixture: ComponentFixture<StandardBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardBanner]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StandardBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
