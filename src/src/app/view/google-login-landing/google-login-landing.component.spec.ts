import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoginLandingComponent } from './google-login-landing.component';

describe('GoogleSigninLandingComponent', () => {
  let component: GoogleLoginLandingComponent;
  let fixture: ComponentFixture<GoogleLoginLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleLoginLandingComponent]
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
