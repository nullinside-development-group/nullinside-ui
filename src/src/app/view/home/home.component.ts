import { Component, OnInit, inject } from '@angular/core';
import {NullinsideService} from "../../service/nullinside.service";
import {VM_ADMIN} from "../../common/constants";
import {WebsiteApp} from "../../common/interface/website-app";
import {Router} from '@angular/router';
import {StandardBannerComponent} from '../../common/components/standard-banner/standard-banner.component';
import {LoadingIconComponent} from "../../common/components/loading-icon/loading-icon.component";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {UserRolesResponse} from "../../common/interface/user-roles-response";

@Component({
  selector: 'app-home',
  imports: [
    StandardBannerComponent,
    LoadingIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private api = inject(NullinsideService);
  private router = inject(Router);

  public roles: string[] | null = null;
  public error: string | null = null;
  public userIsLoggedIn: boolean = false;
  public loading: boolean = true;

  public apps: WebsiteApp[] = [
    {
      displayName: 'IMDB Search',
      description: 'Search the public IMDB database using various search techniques',
      url: 'imdb-search',
      params: undefined
    },
    {
      displayName: 'Twitch Bot',
      description: 'The nullinside anti-bot Twitch bot.',
      url: 'twitch-bot',
      params: undefined
    }
  ];

  ngOnInit(): void {
    this.userIsLoggedIn = null !== localStorage.getItem('auth-token');

    forkJoin({
      // We don't care if the roles don't exist. This is only for authed users. So catch the error if there is one.
      user: this.api.getUserRoles().pipe(catchError(_ => of({roles: []}))) as Observable<UserRolesResponse>,
      featureToggles: this.api.getFeatureToggles()
    })
      .subscribe({
        next: response => {
          this.roles = response.user.roles;
          if (-1 !== this.roles?.indexOf(VM_ADMIN)) {
            this.apps = [...this.apps, {
              displayName: 'VM Admin',
              description: 'Manage the virtual machines for various services.',
              url: 'vm-admin',
              params: null
            }];
          }

          const twitchBotFeatureToggle = response.featureToggles.find(f => 'Twitch Bot' === f.feature);
          if (!twitchBotFeatureToggle || !twitchBotFeatureToggle.isEnabled) {
            this.apps = [...this.apps.filter(f => 'Twitch Bot' !== f.displayName)]
          }

          this.loading = false;
        },
        error: _ => {
          this.error = 'Failed to get list of apps from the server, please refresh to try again...';
          this.loading = false;
        }
      });
  }

  onAppClicked(displayName: string) {
    const existing = this.apps.find(a => a.displayName === displayName);
    if (!existing) {
      return;
    }

    this.router.navigate([existing.url], null !== existing.params ? {
      queryParams: existing.params
    } : undefined);
  }
}
