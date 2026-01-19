import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Nullinside} from "../../service/nullinside";
import {Logo} from "../../common/components/logo/logo";
import {LoadingIcon} from "../../common/components/loading-icon/loading-icon";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";
import {Errors} from "./errors";
import {Auth} from "../../service/auth";

@Component({
  selector: 'app-login-landing',
  imports: [
    Logo,
    LoadingIcon
  ],
  templateUrl: './login-landing.html',
  styleUrl: './login-landing.scss',
  standalone: true
})
export class LoginLanding implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private api = inject(Nullinside);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  timerId: number = -1;
  error: WritableSignal<string> = signal('');

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
          if (Errors.TWITCH_ACCOUNT_HAS_NO_EMAIL === errorNum) {
            this.onLoginFailed('Your Twitch account must have a valid e-mail address, please add one and try again', false)
          } else if (Errors.TWITCH_ERROR_WITH_TOKEN === errorNum) {
            this.onLoginFailed('Twitch failed to give us a valid token, please try again', false)
          } else {
            this.onLoginFailed('Sorry we did something wrong trying to log you in, please try again', false)
          }

          return;
        }

        const token = params.get('token');
        if (!token) {
          this.onLoginFailed();
          return;
        }

        const oauth = JSON.parse(atob(token));
        this.auth.validateToken(oauth.AccessToken).subscribe({
          next: _ => {
            this.auth.setToken(oauth);
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
    this.auth.clearToken();
    this.error.set(message);

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
