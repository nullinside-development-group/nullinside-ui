import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginLandingDesktopComponent} from './login-landing-desktop.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";

describe('LoginLandingDesktopComponent', () => {
  let component: LoginLandingDesktopComponent;
  let fixture: ComponentFixture<LoginLandingDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLandingDesktopComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginLandingDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
