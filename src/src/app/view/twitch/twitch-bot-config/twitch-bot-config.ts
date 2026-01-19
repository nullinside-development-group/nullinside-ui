import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Logo} from '../../../common/components/logo/logo';
import {MatButton} from '@angular/material/button';
import {NullinsideTwitchBot} from "../../../service/nullinside-twitch-bot";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Errors} from "../../login-landing/errors";
import {HttpErrorResponse} from "@angular/common/http";
import {Nullinside} from "../../../service/nullinside";
import {environment} from "../../../../environments/environment";
import {LoadingIcon} from "../../../common/components/loading-icon/loading-icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {TwitchBotFaq} from "../twitch-bot-faq/twitch-bot-faq";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import {Auth} from "../../../service/auth";

@Component({
  selector: 'app-twitch-bot-config',
  imports: [
    Logo,
    MatButton,
    LoadingIcon,
    MatSlideToggle,
    MatCheckbox,
    TwitchBotFaq,
    FormsModule
  ],
  templateUrl: './twitch-bot-config.html',
  styleUrl: './twitch-bot-config.scss',
  standalone: true
})
export class TwitchBotConfig implements OnInit, OnDestroy {
  private twitchBotApi = inject(NullinsideTwitchBot);
  private auth = inject(Auth);
  private api = inject(Nullinside);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public timerId: WritableSignal<number> = signal(-1);
  public botIsMod: WritableSignal<boolean | null> = signal(null);
  public error: WritableSignal<string> = signal('');
  public waitingForModReply: WritableSignal<boolean> = signal(false);
  public botEnabled: WritableSignal<boolean> = signal(true);
  public banKnownBots: WritableSignal<boolean> = signal(true);
  public waitingForSave: WritableSignal<boolean> = signal(false);

  ngOnDestroy(): void {
    if (this.timerId() !== -1) {
      clearTimeout(this.timerId());
    }

    // Close any open notifications when we move to a different screen.
    this.snackBar.dismiss();
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
            this.onLoginFailed('Twitch failed to log you in successfully, please try again', false)
          } else {
            this.onLoginFailed('Sorry we did something wrong trying to log you in, please try again', false)
          }

          return;
        }

        // Get the token, if there isn't one then they didn't get here by hitting the login button. Let's send them back
        // to the login page if that's the case. It'll help us keep people synced on updates to the permissions we
        // request from their tokens.
        const token = params.get('token');
        if (!token) {
          this.router.navigate(['twitch/bot']);
          return;
        }

        const oauth = JSON.parse(atob(token));
        this.auth.validateToken(oauth.AccessToken).subscribe({
          next: _ => {
            this.auth.setToken(oauth);

            // Check if the bot account is modded. If it isn't, we can offer to mod it.
            this.twitchBotApi.getIsMod().subscribe({
              next: response => {
                this.botIsMod.set(response.isMod);
              },
              error: err => {
                this.botIsMod.set(false);
                this.error.set('Unable to determine if nullinside is a mod in your channel');
                console.log(err);
              }
            });

            // Get the person's existing configuration.
            this.twitchBotApi.getConfig().subscribe({
              next: response => {
                this.botEnabled.set(response.isEnabled);
                this.banKnownBots.set(response.banKnownBots);
              },
              error: err => console.error(err)
            });
          },
          error: (_: HttpErrorResponse) => {
            this.onLoginFailed();
          }
        });

        // Kind of a workaround to remove the token from the query parameters in the url. The reason for this is
        // if someone wants to bookmark the page we don't want to leave that in there. A different site layout will
        // make this unnecessary.
        const url = this.router.createUrlTree([], {relativeTo: this.route}).toString();
        this.location.go(url);
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
      this.timerId.set(setTimeout(() => {
        clearTimeout(this.timerId());

        // Need to use window.location here instead of the router because otherwise the external javascript from Google
        // doesn't reload on the login page, and you can't retry your login until you refresh.
        //
        // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
        // issues that have changed over time the linting complains about it.
        window.location = environment.siteUrl;
      }, 5000));
    }
  }

  modBot() {
    this.waitingForModReply.set(true);
    this.twitchBotApi.modBot().subscribe({
      next: success => {
        this.botIsMod.set(success);
      },
      error: err => {
        console.error(err);
      }
    }).add(() => this.waitingForModReply.set(false));
  }

  saveConfig() {
    this.waitingForSave.set(true);
    this.twitchBotApi.setConfig({
      isEnabled: this.botEnabled(),
      banKnownBots: this.banKnownBots()
    }).subscribe({
      next: config => {
        this.botEnabled.set(config.isEnabled);
        this.banKnownBots.set(config.banKnownBots);
        this.snackBar.open('Save successful', undefined, {
          panelClass: ['snackbar-success']
        });
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Failed to save, please try again', undefined, {
          panelClass: ['snackbar-failure']
        });
      }
    }).add(() => this.waitingForSave.set(false));
  }
}
