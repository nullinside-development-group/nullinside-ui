import { Component, OnDestroy, OnInit } from '@angular/core';
import { NullinsideService } from "../../service/nullinside.service";
import { LogoComponent } from "../../common/components/logo/logo.component";
import { LoadingIconComponent } from "../../common/components/loading-icon/loading-icon.component";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-google-login-landing',
  standalone: true,
  imports: [
    LogoComponent,
    LoadingIconComponent
  ],
  templateUrl: './google-login-landing.component.html',
  styleUrl: './google-login-landing.component.scss'
})
export class GoogleLoginLandingComponent implements OnInit, OnDestroy {
  timerId: number = -1;
  error: string = '';

  constructor(private api: NullinsideService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.timerId !== -1) {
      clearTimeout(this.timerId);
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        this.api.validateToken(params.get('authToken') || '')
          .subscribe({
            next: valid => {
              if (valid) {
                this.router.navigate(['/home']);
              } else {
                this.onLoginFailed();
              }
            },
            error: (_: any) => {
              this.onLoginFailed();
            }
          });
      },
      error: (_: any) => {
        this.onLoginFailed();
      }
    });
  }

  onLoginFailed(): void {
    this.error = ':( Failed to login, please try again';

    this.timerId = setTimeout(() => {
      // Need to use window.location here instead of the router because otherwise the external javascript from Google
      // doesn't reload on the index page, and you can't retry your login until you refresh.
      // @ts-ignore
      window.location = environment.siteUrl
    }, 5000);
  }
}
