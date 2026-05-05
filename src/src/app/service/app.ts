import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {WebsiteApp} from "../common/interface/website-app";
import {Auth} from "./auth";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {UserRolesResponse} from "../common/interface/user-roles-response";
import {toObservable} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class App {
  private publicApps: WebsiteApp[] = [
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
      },
      {
        displayName: 'IMDB Search',
        description: 'Search the public IMDB database using various search techniques',
        url: 'imdb-search'
      }
    ]
  };

  private auth = inject(Auth);
  public apps: WritableSignal<WebsiteApp[]> = signal(this.publicApps);
  public loading: WritableSignal<boolean> = signal(true);
  public error: WritableSignal<string | null> = signal(null);
  private userLoginHasChanged = toObservable(this.auth.userIsLoggedIn);

  constructor() {
    this.userLoginHasChanged.subscribe(_ => this.checkRoles());
    this.checkRoles();
  }

  private checkRoles() {
    // No need to check roles if the user isn't logged in
    if (!this.auth.userIsLoggedIn()) {
      this.apps.set(this.publicApps);
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
          const roles = response.user.roles;
          const discoveredApps = [...this.publicApps];

          if (roles?.includes('ADMIN')) {
            for (const role in this.roleToAppPermissions) {
              discoveredApps.push(...this.roleToAppPermissions[role]);
            }
          } else {
            roles?.forEach(role => {
              if (role in this.roleToAppPermissions) {
                discoveredApps.push(...this.roleToAppPermissions[role]);
              }
            });
          }

          const twitchBotFeatureToggle = response.featureToggles.find(f => 'Twitch Bot' === f.feature);
          if (!twitchBotFeatureToggle || !twitchBotFeatureToggle.isEnabled) {
            this.apps.set(discoveredApps.filter(f => 'Twitch Bot' !== f.displayName));
          } else {
            this.apps.set(discoveredApps);
          }

          this.loading.set(false);
        },
        error: err => {
          console.error(err);
          this.error.set('Failed to get list of apps from the server, please refresh to try again...');
          this.loading.set(false);
        }
      });
  }
}
