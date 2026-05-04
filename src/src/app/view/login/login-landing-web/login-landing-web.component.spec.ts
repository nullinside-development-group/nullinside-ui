import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginLandingWeb} from './login-landing-web.component';
import {provideRouter} from '@angular/router';

describe('LoginLanding', () => {
  let component: LoginLandingWeb;
  let fixture: ComponentFixture<LoginLandingWeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLandingWeb],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginLandingWeb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
