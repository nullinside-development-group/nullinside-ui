import { Component, OnDestroy, OnInit } from '@angular/core';
import { NullinsideService } from "../../service/nullinside.service";
import { LogoComponent } from "../../common/components/logo/logo.component";
import { LoadingIconComponent } from "../../common/components/loading-icon/loading-icon.component";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { Errors } from "./errors";

@Component({
    selector: 'app-login-landing',
    imports: [
        LogoComponent,
        LoadingIconComponent
    ],
    templateUrl: './login-landing.component.html',
    styleUrl: './login-landing.component.scss'
})
export class LoginLandingComponent implements OnInit, OnDestroy {
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
        const error = params.get('error');
        if (null !== error) {
          const errorNum = +error;
          if (Errors.TwitchAccountHasNoEmail === errorNum) {
            this.onLoginFailed('Your Twitch account must have a valid e-mail address, please add one and try again', false)
          } else if (Errors.TwitchErrorWithToken === errorNum) {
            this.onLoginFailed('Twitch failed to give us a valid token, please add one and try again', false)
          } else {
            this.onLoginFailed('Sorry we did something wrong trying to log you in, please add one and try again', false)
          }

          return;
        }

        const token = params.get('token');
        if (!token) {
          this.onLoginFailed();
          return;
        }

        this.api.validateToken(token).subscribe({
          next: _ => {
            localStorage.setItem('auth-token', token);
            this.router.navigate(['/home']);
          },
          error: (_: HttpErrorResponse) => {
            this.onLoginFailed();
          }
        });
      },
      error: (_: HttpErrorResponse) => {
        this.onLoginFailed();
      }
    });
  }

  onLoginFailed(message = ':( Failed to login, please try again', redirect = true): void {
    localStorage.removeItem('auth-token');
    this.error = message;

    if (redirect) {
      this.timerId = setTimeout(() => {
        // Need to use window.location here instead of the router because otherwise the external javascript from Google
        // doesn't reload on the login page, and you can't retry your login until you refresh.
        //
        // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
        // issues that have changed over time the linting complains about it.
        window.location = environment.siteUrl;
      }, 5000);
    }
  }
}
