import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {LogoComponent} from '../../../common/components/logo/logo.component';
import {MatButton} from '@angular/material/button';
import {NullinsideTwitchBotService} from "../../../service/nullinside-twitch-bot.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Errors} from "../../login-landing/errors";
import {HttpErrorResponse} from "@angular/common/http";
import {NullinsideService} from "../../../service/nullinside.service";
import {environment} from "../../../../environments/environment";
import {LoadingIconComponent} from "../../../common/components/loading-icon/loading-icon.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {TwitchBotFaqComponent} from "../twitch-bot-faq/twitch-bot-faq.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-twitch-bot-config',
  imports: [
    LogoComponent,
    MatButton,
    LoadingIconComponent,
    MatSlideToggle,
    MatCheckbox,
    TwitchBotFaqComponent,
    FormsModule
  ],
  templateUrl: './twitch-bot-config.component.html',
  styleUrl: './twitch-bot-config.component.scss'
})
export class TwitchBotConfigComponent implements OnInit, OnDestroy {
  private twitchBotApi = inject(NullinsideTwitchBotService);
  private api = inject(NullinsideService);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public botIsMod: boolean | null = null;
  public timerId: number = -1;
  public error: string = '';
  public waitingForModReply = false;
  public botEnabled = true;
  public banKnownBots = true;
  public waitingForSave = false;

  ngOnDestroy(): void {
    if (this.timerId !== -1) {
      clearTimeout(this.timerId);
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
          if (Errors.TwitchAccountHasNoEmail === errorNum) {
            this.onLoginFailed('Your Twitch account must have a valid e-mail address, please add one and try again', false)
          } else if (Errors.TwitchErrorWithToken === errorNum) {
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
          this.router.navigate(['twitch-bot']);
          return;
        }

        // Save the token and make sure its valid.
        localStorage.setItem('auth-token', token);
        this.api.validateToken(token).subscribe({
          error: (_: HttpErrorResponse) => {
            this.onLoginFailed();
          }
        });

        // Kind of a workaround to remove the token from the query parameters in the url. The reason for this is
        // if someone wants to bookmark the page we don't want to leave that in there. A different site layout will
        // make this unnecessary.
        const url = this.router.createUrlTree([], {relativeTo: this.route}).toString();
        this.location.go(url);

        // Check if the bot account is modded. If it isn't, we can offer to mod it.
        this.twitchBotApi.getIsMod().subscribe({
          next: response => {
            this.botIsMod = response.isMod;
          },
          error: err => {
            this.botIsMod = false;
            this.error = 'Unable to determine if nullinside is a mod in your channel';
            console.log(err);
          }
        });

        // Get the person's existing configuration.
        this.twitchBotApi.getConfig().subscribe({
          next: response => {
            this.botEnabled = response.isEnabled;
            this.banKnownBots = response.banKnownBots;
          },
          error: err => console.error(err)
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
        clearTimeout(this.timerId);

        // Need to use window.location here instead of the router because otherwise the external javascript from Google
        // doesn't reload on the login page, and you can't retry your login until you refresh.
        //
        // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
        // issues that have changed over time the linting complains about it.
        window.location = environment.siteUrl;
      }, 5000);
    }
  }

  modBot() {
    this.waitingForModReply = true;
    this.twitchBotApi.modBot().subscribe({
      next: success => {
        this.botIsMod = success;
      },
      error: err => {
        console.error(err);
      }
    }).add(() => this.waitingForModReply = false);
  }

  saveConfig() {
    this.waitingForSave = true;
    console.log({
      isEnabled: this.botEnabled,
      banKnownBots: this.banKnownBots
    })
    this.twitchBotApi.setConfig({
      isEnabled: this.botEnabled,
      banKnownBots: this.banKnownBots
    }).subscribe({
      next: config => {
        this.botEnabled = config.isEnabled;
        this.banKnownBots = config.banKnownBots;
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
    }).add(() => this.waitingForSave = false);
  }
}
