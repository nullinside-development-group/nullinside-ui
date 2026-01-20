import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {VM_ADMIN} from "../../common/constants";
import {WebsiteApp} from "../../common/interface/website-app";
import {Router} from '@angular/router';
import {StandardBanner} from '../../common/components/standard-banner/standard-banner';
import {LoadingIcon} from "../../common/components/loading-icon/loading-icon";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {UserRolesResponse} from "../../common/interface/user-roles-response";
import {Auth} from "../../service/auth";

@Component({
  selector: 'app-home',
  imports: [
    StandardBanner,
    LoadingIcon
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  public roles: WritableSignal<string[] | null> = signal(null);
  public error: WritableSignal<string | null> = signal(null);
  public userIsLoggedIn: WritableSignal<boolean> = signal(false);
  public loading: WritableSignal<boolean> = signal(true);

  public apps: WritableSignal<WebsiteApp[]> = signal([
    {
      displayName: 'IMDB Search',
      description: 'Search the public IMDB database using various search techniques',
      url: 'imdb-search',
      params: undefined
    },
    {
      displayName: 'Twitch Bot',
      description: 'The nullinside anti-bot Twitch bot.',
      url: 'twitch/bot',
      params: undefined
    }
  ]);

  ngOnInit(): void {
    this.userIsLoggedIn.set(null !== this.auth.getToken());

    forkJoin({
      // We don't care if the roles don't exist. This is only for authed users. So catch the error if there is one.
      user: this.auth.getUserRoles().pipe(catchError(_ => of({roles: []}))) as Observable<UserRolesResponse>,
      featureToggles: this.auth.getFeatureToggles()
    })
      .subscribe({
        next: response => {
          this.roles.set(response.user.roles);
          if (-1 !== this.roles()?.indexOf(VM_ADMIN)) {
            this.apps.set([...this.apps(), {
              displayName: 'VM Admin',
              description: 'Manage the virtual machines for various services.',
              url: 'vm-admin',
              params: null
            }]);
          }

          const twitchBotFeatureToggle = response.featureToggles.find(f => 'Twitch Bot' === f.feature);
          if (!twitchBotFeatureToggle || !twitchBotFeatureToggle.isEnabled) {
            this.apps.set([...this.apps().filter(f => 'Twitch Bot' !== f.displayName)])
          }

          this.loading.set(false);
        },
        error: _ => {
          console.log(_);
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

    this.router.navigate([existing.url], null !== existing.params ? {
      queryParams: existing.params
    } : undefined);
  }
}
