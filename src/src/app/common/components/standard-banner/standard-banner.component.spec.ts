import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StandardBannerComponent} from './standard-banner.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('StandardBannerComponent', () => {
  let component: StandardBannerComponent;
  let fixture: ComponentFixture<StandardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardBannerComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StandardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
