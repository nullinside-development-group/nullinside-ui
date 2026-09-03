import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TimeSinceCountdown} from './time-since-countdown';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('TimeSinceCountdown', () => {
  let component: TimeSinceCountdown;
  let fixture: ComponentFixture<TimeSinceCountdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSinceCountdown],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimeSinceCountdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
