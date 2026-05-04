import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginIndex} from './login-index.component';
import {provideRouter} from '@angular/router';

describe('Login', () => {
  let component: LoginIndex;
  let fixture: ComponentFixture<LoginIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginIndex],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginIndex);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
