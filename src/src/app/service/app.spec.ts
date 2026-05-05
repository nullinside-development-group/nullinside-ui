import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {Auth} from './auth';
import {of} from 'rxjs';
import {signal} from '@angular/core';

describe('App', () => {
  let service: App;
  let authMock: any;

  beforeEach(() => {
    authMock = {
      userIsLoggedIn: signal(false),
      getUserRoles: () => of({roles: []}),
      getFeatureToggles: () => of([{feature: 'Twitch Bot', isEnabled: true}])
    };

    TestBed.configureTestingModule({
      providers: [
        App,
        {provide: Auth, useValue: authMock}
      ]
    });
    service = TestBed.inject(App);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have public access when not logged in', () => {
    expect(service.apps().length).toBe(1);
    expect(service.apps()[0].displayName).toBe('Twitch Bot');
  });

  it('should have VM_ADMIN access when user has VM_ADMIN role', () => {
    authMock.userIsLoggedIn.set(true);
    authMock.getUserRoles = () => of({roles: ['VM_ADMIN']});

    // Trigger the checkRoles method which is normally triggered by the observable in constructor
    // Since it's private, we use array notation to access it for testing purposes.
    (service as any).checkRoles();

    const appNames = service.apps().map(a => a.displayName);
    expect(appNames).toContain('Twitch Bot');
    expect(appNames).toContain('VM Admin');
    expect(appNames.length).toBe(2);
  });

  it('should have all access when user has ADMIN role', () => {
    authMock.userIsLoggedIn.set(true);
    authMock.getUserRoles = () => of({roles: ['ADMIN']});

    (service as any).checkRoles();

    const appNames = service.apps().map(a => a.displayName);
    expect(appNames).toContain('Twitch Bot');
    expect(appNames).toContain('VM Admin');
    expect(appNames).toContain('Contact Us Admin');
    expect(appNames).toContain('IMDB Search');
    expect(appNames.length).toBe(4);
  });

  it('should not show Twitch Bot if feature toggle is disabled', () => {
    authMock.userIsLoggedIn.set(true);
    authMock.getUserRoles = () => of({roles: []});
    authMock.getFeatureToggles = () => of([{feature: 'Twitch Bot', isEnabled: false}]);

    (service as any).checkRoles();

    const appNames = service.apps().map(a => a.displayName);
    expect(appNames).not.toContain('Twitch Bot');
  });
});
