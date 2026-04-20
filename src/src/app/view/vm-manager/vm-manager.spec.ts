import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VmManager} from './vm-manager';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Auth} from '../../service/auth';
import {signal} from '@angular/core';

describe('VmManager', () => {
  let component: VmManager;
  let fixture: ComponentFixture<VmManager>;
  let authMock: unknown;

  beforeEach(async () => {
    authMock = {
      userIsLoggedIn: signal(true)
    };

    await TestBed.configureTestingModule({
      imports: [VmManager],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: Auth, useValue: authMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VmManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
