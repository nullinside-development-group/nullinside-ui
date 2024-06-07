import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogoComponent} from '../../../common/components/logo/logo.component';
import {MatButton} from '@angular/material/button';
import {NullinsideTwitchBotService} from "../../../service/nullinside-twitch-bot.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
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

@Component({
  selector: 'app-twitch-bot-config',
  standalone: true,
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
  public botIsMod: boolean | null = null;
  public timerId: number = -1;
  public error: string = '';
  public waitingForModReply = false;
  public botEnabled = true;
  public banKnownBots = true;
  public waitingForSave = false;

  constructor(private twitchBotApi: NullinsideTwitchBotService,
              private api: NullinsideService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
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
        if (token) {
          localStorage.setItem('auth-token', token);
          this.api.validateToken(token).subscribe({
            error: (_: HttpErrorResponse) => {
              this.onLoginFailed();
            }
          });
        }

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
        this.snackBar.open('Failed to save config, please try again...', undefined, {
          panelClass: ['snackbar-failure']
        });
      }
    }).add(() => this.waitingForSave = false);
  }
}
