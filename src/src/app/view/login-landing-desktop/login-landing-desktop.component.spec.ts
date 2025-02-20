import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLandingDesktopComponent } from './login-landing-desktop.component';

describe('LoginLandingDesktopComponent', () => {
  let component: LoginLandingDesktopComponent;
  let fixture: ComponentFixture<LoginLandingDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLandingDesktopComponent]
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
