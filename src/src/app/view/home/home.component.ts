import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../../common/components/logo/logo.component";
import { NullinsideService } from "../../service/nullinside.service";
import { VM_ADMIN } from "../../common/constants";
import { WebsiteApp } from "../../common/interface/website-app";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoComponent
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
}

