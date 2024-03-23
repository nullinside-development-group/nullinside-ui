import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLandingComponent } from './login-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('GoogleSigninLandingComponent', () => {
  let component: LoginLandingComponent;
  let fixture: ComponentFixture<LoginLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLandingComponent, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
