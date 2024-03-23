import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../../common/components/logo/logo.component";
import { NullinsideService } from "../../service/nullinside.service";
import { VM_ADMIN } from "../../common/constants";
import { WebsiteApp } from "../../common/interface/website-app";
import { Router } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoComponent,
    MatButton,
    MatAnchor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public roles: string[] | null = null;
  public error: string | null = null;
  public apps: WebsiteApp[] = [{
    displayName: 'VM Admin',
    description: 'Manage the virtual machines for various services.',
    url: 'vm-admin'
  }];

  constructor(private api: NullinsideService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.api.getUserRoles()
      .subscribe({
        next: response => {
          this.roles = response.roles;
        },
        error: error => {
          this.error = error;
        }
      })
  }

  protected readonly VM_ADMIN = VM_ADMIN;

  onAppClicked(displayName: string) {
    const existing = this.apps.find(a => a.displayName === displayName);
    if (!existing) {
      return;
    }

    this.router.navigate([existing.url]);
  }

  onLogout(): void {
    localStorage.removeItem('auth-token');
    
    // Need to use window.location here instead of the router because otherwise the external javascript from Google
    // doesn't reload on the index page, and you can't retry your login until you refresh.
    //
    // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
    // issues that have changed over time the linting complains about it.
    window.location = environment.siteUrl;
  }
}

