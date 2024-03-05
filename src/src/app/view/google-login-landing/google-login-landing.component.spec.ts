import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoginLandingComponent } from './google-login-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('GoogleSigninLandingComponent', () => {
  let component: GoogleLoginLandingComponent;
  let fixture: ComponentFixture<GoogleLoginLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleLoginLandingComponent, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoogleLoginLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
