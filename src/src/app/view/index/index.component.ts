import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {WebsiteApp} from "../../common/interface/website-app";
import {Router} from '@angular/router';
import {LoadingIcon} from "../../common/components/loading-icon/loading-icon";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {UserRolesResponse} from "../../common/interface/user-roles-response";
import {Auth} from "../../service/auth";
import {toObservable} from '@angular/core/rxjs-interop';
import {TwitchStreamCarousel} from '../../common/components/twitch-stream-carousel/twitch-stream-carousel';
import {TwitchLiveBotUsers} from '../../common/interface/twitch-live-bot-users';
import {Nullinside} from '../../service/nullinside';

@Component({
  selector: 'app-home',
  imports: [
    LoadingIcon,
    TwitchStreamCarousel
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  standalone: true
})
export class Index implements OnInit {
  private api = inject(Nullinside);
  private auth = inject(Auth);
  private router = inject(Router);

  private publicApps: WebsiteApp[] = [
    {
      displayName: 'IMDB Search',
      description: 'Search the public IMDB database using various search techniques',
      url: 'imdb-search'
    },
    {
      displayName: 'Twitch Bot',
      description: 'The nullinside anti-bot Twitch bot.',
      url: 'twitch/bot'
    }
  ];

  private roleToAppPermissions: Record<string, WebsiteApp[]> = {
    'VM_ADMIN': [
      {
        displayName: 'VM Admin',
        description: 'Manage the virtual machines for various services.',
        url: 'vm-admin'
      }
    ],
    'ADMIN': [
      {
        displayName: 'Contact Us Admin',
        description: 'View and reply to all submitted contact us feedback.',
        url: 'contact-us/admin'
      }
    ]
  };

  private userLoginHasChanged = toObservable(this.auth.userIsLoggedIn)

  public carouselEnabled = signal(false);
  public roles: WritableSignal<string[] | null> = signal(null);
  public error: WritableSignal<string | null> = signal(null);
  public loading: WritableSignal<boolean> = signal(true);

  public apps: WritableSignal<WebsiteApp[]> = signal(this.publicApps);
  protected liveStreams: WritableSignal<TwitchLiveBotUsers[]> = signal([]);

  ngOnInit(): void {
    this.userLoginHasChanged.subscribe(_ => this.checkRoles());
    this.api.getAllLiveTwitchBotUsers().subscribe(response => this.liveStreams.set(response));
    this.checkRoles();
  }

  private checkRoles() {
    // No need to check roles if the user isn't logged in
    if (!this.auth.userIsLoggedIn()) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    forkJoin({
      // We don't care if the roles don't exist. This is only for authed users. So catch the error if there is one.
      user: this.auth.getUserRoles().pipe(catchError(_ => of({roles: []}))) as Observable<UserRolesResponse>,
      featureToggles: this.auth.getFeatureToggles()
    })
      .subscribe({
        next: response => {
          this.apps.set([...this.publicApps]);
          this.roles.set(response.user.roles);

          if (this.roles()?.includes('ADMIN')) {
            for (const role in this.roleToAppPermissions) {
              this.apps.set([...this.apps(), ...this.roleToAppPermissions[role]]);
            }
          } else {
            this.roles()?.forEach(role => {
              if (role in this.roleToAppPermissions) {
                this.apps.set([...this.apps(), ...this.roleToAppPermissions[role]]);
              }
            });
          }

          const twitchBotFeatureToggle = response.featureToggles.find(f => 'Twitch Bot' === f.feature);
          if (!twitchBotFeatureToggle || !twitchBotFeatureToggle.isEnabled) {
            this.apps.set([...this.apps().filter(f => 'Twitch Bot' !== f.displayName)])
          }

          this.loading.set(false);
        },
        error: err => {
          console.log(err);
          this.error.set('Failed to get list of apps from the server, please refresh to try again...');
          this.loading.set(false);
        }
      });
  }

  onAppClicked(displayName: string) {
    const existing = this.apps().find(a => a.displayName === displayName);
    if (!existing) {
      return;
    }

    this.router.navigate([existing.url]);
  }
}
