import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginLanding} from './login-landing';
import {provideRouter} from '@angular/router';

describe('LoginLanding', () => {
  let component: LoginLanding;
  let fixture: ComponentFixture<LoginLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLanding],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
