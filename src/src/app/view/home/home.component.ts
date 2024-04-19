import {Component, OnInit} from '@angular/core';
import {LogoComponent} from "../../common/components/logo/logo.component";
import {NullinsideService} from "../../service/nullinside.service";
import {VM_ADMIN} from "../../common/constants";
import {WebsiteApp} from "../../common/interface/website-app";
import {Router} from '@angular/router';
import {MatAnchor, MatButton} from '@angular/material/button';
import {StandardBannerComponent} from '../../common/components/standard-banner/standard-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoComponent,
    MatButton,
    MatAnchor,
    StandardBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public roles: string[] | null = null;
  public error: string | null = null;
  public userIsLoggedIn: boolean = false;

  public apps: WebsiteApp[] = [
    {
      displayName: 'IMDB Search',
      description: 'Search the public IMDB database using various search techniques',
      url: 'imdb-search',
      params: undefined
    }
    /*    {
          displayName: 'Twitch Bot',
          description: 'The nullinside anti-bot Twitch bot.',
          url: 'twitch-bot/index',
          params: undefined
        },*/
  ];

  constructor(private api: NullinsideService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userIsLoggedIn = null !== localStorage.getItem('auth-token');

    this.api.getUserRoles()
      .subscribe({
        next: response => {
          this.roles = response.roles;
          if (-1 !== this.roles?.indexOf(VM_ADMIN)) {
            this.apps = [...this.apps, {
              displayName: 'VM Admin',
              description: 'Manage the virtual machines for various services.',
              url: 'vm-admin',
              params: null
            }];
          }
        },
        error: error => {
          this.error = error;
        }
      })
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
