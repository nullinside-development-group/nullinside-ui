import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StandardBanner} from './standard-banner';
import {signal} from '@angular/core';
import {of} from 'rxjs';
import {Auth} from '../../../service/auth';

describe('StandardBanner', () => {
  let component: StandardBanner;
  let fixture: ComponentFixture<StandardBanner>;
  let authMock: unknown;

  beforeEach(async () => {
    authMock = {
      userIsLoggedIn: signal(true),
      validateToken: () => of(true),
      getToken: () => 'token'
    };

    await TestBed.configureTestingModule({
      imports: [StandardBanner],
      providers: [{provide: Auth, useValue: authMock}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StandardBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
