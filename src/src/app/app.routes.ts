import {Routes} from '@angular/router';
import {NotFound} from "./view/not-found/not-found";
import {LoginLanding} from "./view/login-landing/login-landing";
import {Home} from "./view/home/home";
import {authGuard} from "./middleware/auth-guard";
import {VmManager} from './view/vm-manager/vm-manager';
import {Login} from './view/login/login';
import {TwitchBotIndex} from './view/twitch/twitch-bot-index/twitch-bot-index';
import {TwitchBotConfig} from './view/twitch/twitch-bot-config/twitch-bot-config';
import {ImdbSearch} from './view/imdb-search/imdb-search';
import {BackgroundWebglExample} from "./view/background-webgl-example/background-webgl-example";
import {LoginLandingDesktop} from "./view/login-landing-desktop/login-landing-desktop";

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'background', component: BackgroundWebglExample},
  {path: 'user/auth', component: Login},
  {path: 'user/login', component: LoginLanding},
  {path: 'user/login/desktop', component: LoginLandingDesktop},
  {path: 'home', component: Home}, // For google redirect
  {path: 'vm-admin', component: VmManager, canActivate: [authGuard]},
  {path: 'twitch/bot', component: TwitchBotIndex},
  {path: 'twitch/bot/config', component: TwitchBotConfig},
  {path: 'imdb-search', component: ImdbSearch},
  {path: '**', component: NotFound},
];
