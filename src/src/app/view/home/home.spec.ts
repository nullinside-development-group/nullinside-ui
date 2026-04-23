import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Home} from './home';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Auth} from '../../service/auth';
import {of} from 'rxjs';
import {Nullinside} from '../../service/nullinside';
import {signal} from '@angular/core';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let authMock: Partial<Auth>;
  let nullinsideMock: Partial<Nullinside>;

  beforeEach(async () => {
    authMock = {
      userIsLoggedIn: signal(false),
      getUserRoles: () => of({roles: []}),
      getFeatureToggles: () => of([])
    };

    nullinsideMock = {
      getAllLiveTwitchBotUsers: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: Auth, useValue: authMock},
        {provide: Nullinside, useValue: nullinsideMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show the carousel when there are live streams', () => {
  //   nullinsideMock.getAllLiveTwitchBotUsers = () => of([
  //     {
  //       id: '1',
  //       username: 'user1',
  //       title: 'title1',
  //       thumbnailUrl: 'https://placehold.co/200x112',
  //       viewerCount: 100,
  //       twitchId: '1',
  //       goneLiveTime: new Date(),
  //       streamTitle: 'Stream Title',
  //       gameName: 'Game Title'
  //     }
  //   ]);
  //
  //   // We need to re-initialize or trigger ngOnInit again if it already ran.
  //   // Since it's in ngOnInit, and detectChanges runs it.
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //
  //   const carousel = fixture.nativeElement.querySelector('app-twitch-stream-carousel');
  //   expect(carousel).toBeTruthy();
  // });
});
