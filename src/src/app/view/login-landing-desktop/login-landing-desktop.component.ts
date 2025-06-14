import { Component, OnInit, inject } from '@angular/core';
import {NullinsideService} from "../../service/nullinside.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Errors} from "../login-landing/errors";
import {HttpErrorResponse} from "@angular/common/http";
import {LoadingIconComponent} from "../../common/components/loading-icon/loading-icon.component";
import {LogoComponent} from "../../common/components/logo/logo.component";
import {OAuth} from "../../common/interface/oauth";
import {MatButton} from "@angular/material/button";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";

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
    private api = inject(NullinsideService);
    private route = inject(ActivatedRoute);

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

                navigator.clipboard.writeText(JSON.stringify(oAuth));
                this.loading = false;
            },
            error: (_: HttpErrorResponse) => {
                this.onLoginFailed();
            }
        });
    }

    onLoginFailed(message = ':( Failed to login, please try again'): void {
        this.error = message;
        this.loading = false;
    }

    protected readonly JSON = JSON;
}
