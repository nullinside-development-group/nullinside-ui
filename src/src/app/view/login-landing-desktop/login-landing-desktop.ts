import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Errors} from "./errors";
import {HttpErrorResponse} from "@angular/common/http";
import {Logo} from "../../common/components/logo/logo";

@Component({
  selector: 'app-login-landing-desktop',
  imports: [
    Logo
  ],
  templateUrl: './login-landing-desktop.html',
  styleUrl: './login-landing-desktop.scss',
  standalone: true
})
export class LoginLandingDesktop implements OnInit {
  private route = inject(ActivatedRoute);

  error: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        // Handle any errors
        const error = params.get('error');
        if (null !== error) {
          const errorNum = +error;
          if (Errors.INTERNAL_ERROR === errorNum) {
            this.onLoginFailed()
          } else if (Errors.TWITCH_FAILED_TO_GENERATE_TOKEN === errorNum) {
            this.onLoginFailed('Received error from twitch, it may be down temporarily')
          }

          return;
        }
      },
      error: (_: HttpErrorResponse) => {
        this.onLoginFailed();
      }
    });
  }

  onLoginFailed(message = 'Internal error logging you in'): void {
    this.error.set(message);
  }
}
