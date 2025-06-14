import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Errors} from "../login-landing/errors";
import {HttpErrorResponse} from "@angular/common/http";
import {LoadingIconComponent} from "../../common/components/loading-icon/loading-icon.component";
import {LogoComponent} from "../../common/components/logo/logo.component";
import {OAuth} from "../../common/interface/oauth";
import {MatButton} from "@angular/material/button";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {interval, Subscription} from "rxjs";

@Component({
    selector: 'app-login-landing-desktop',
    imports: [
        LoadingIconComponent,
        LogoComponent,
        MatButton,
        CdkCopyToClipboard
    ],
    templateUrl: './login-landing-desktop.component.html',
    styleUrl: './login-landing-desktop.component.scss'
})
export class LoginLandingDesktopComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private timer: Subscription | undefined;
    private desktopData: string | undefined;

    loggedIn: boolean = false;
    error: string = '';
    oAuth: OAuth | null = null;
    loading: boolean = true;

    ngOnInit(): void {
        this.route.queryParamMap.subscribe({
            next: (params: ParamMap) => {
                const error = params.get('error');
                if (null !== error) {
                    const errorNum = +error;
                    if (Errors.TWITCH_ACCOUNT_HAS_NO_EMAIL === errorNum) {
                        this.onLoginFailed('Your Twitch account must have a valid e-mail address, please add one and try again')
                    } else if (Errors.TWITCH_ERROR_WITH_TOKEN === errorNum) {
                        this.onLoginFailed('Twitch failed to give us a valid token, please try again')
                    } else {
                        this.onLoginFailed('Sorry we did something wrong trying to log you in, please try again')
                    }

                    return;
                }

                const oAuth = {
                    bearer: params.get('bearer'),
                    refresh: params.get('refresh'),
                    expiresUtc: params.get('expiresUtc'),
                };

                if (null === oAuth.bearer || null === oAuth.refresh || null === oAuth.expiresUtc) {
                    this.onLoginFailed();
                    return;
                }

                this.oAuth = {
                    bearer: oAuth.bearer,
                    refresh: oAuth.refresh,
                    expiresUtc: oAuth.expiresUtc
                };

                // DO NOT assign this.desktopData until AFTER you update the clipboard successfully.
                // The absence of a value on this.desktopData is what tells the application we haven't logged in yet.
                const json = JSON.stringify(oAuth);
                navigator.clipboard.writeText(json);
                this.desktopData = json;

                this.loading = false;
                this.timer = interval(1000)
                  .subscribe({
                    next: _ => {
                      this.runCheckForLogin();
                    },
                    error: e => {
                      console.error(e);
                    }
                  });
            },
            error: (_: HttpErrorResponse) => {
                this.onLoginFailed();
            }
        });
    }

    private runCheckForLogin() {
      try {
        navigator.clipboard.readText().then(text => {
          // If the text matches what we put on the clipboard then we aren't signed in yet.
          if (undefined === this.desktopData || text === this.desktopData) {
            return;
          }

          // If the text does match, we are signed in on the desktop app. Maybe...kinda....might be...you never know...
          // Don't judge me. -.-
          this.timer?.unsubscribe();
          this.loggedIn = true;
        })
      } catch {
        // Do nothing, just don't crash.
      }
    }

    onLoginFailed(message = ':( Failed to login, please try again'): void {
        this.error = message;
        this.loading = false;
    }

    protected readonly JSON = JSON;
}
