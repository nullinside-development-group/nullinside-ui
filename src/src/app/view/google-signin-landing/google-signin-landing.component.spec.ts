import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSigninLandingComponent } from './google-signin-landing.component';

describe('GoogleSigninLandingComponent', () => {
  let component: GoogleSigninLandingComponent;
  let fixture: ComponentFixture<GoogleSigninLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSigninLandingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoogleSigninLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
