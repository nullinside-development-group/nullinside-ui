import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginLandingDesktop} from './login-landing-desktop';
import {provideRouter} from '@angular/router';

describe('LoginLandingDesktop', () => {
  let component: LoginLandingDesktop;
  let fixture: ComponentFixture<LoginLandingDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLandingDesktop],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginLandingDesktop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
