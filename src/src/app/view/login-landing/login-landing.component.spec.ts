import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLandingComponent } from './login-landing.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GoogleSigninLandingComponent', () => {
  let component: LoginLandingComponent;
  let fixture: ComponentFixture<LoginLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoginLandingComponent, RouterModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
