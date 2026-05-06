import {Routes} from '@angular/router';
import {NotFound} from "./view/not-found/not-found";
import {LoginLandingWeb} from "./view/login/login-landing-web/login-landing-web.component";
import {authGuard} from "./middleware/auth-guard";
import {VmManager} from './view/vm-manager/vm-manager';
import {LoginIndex} from './view/login/login-index/login-index.component';
import {TwitchBotIndex} from './view/twitch/twitch-bot-index/twitch-bot-index';
import {TwitchBotConfig} from './view/twitch/twitch-bot-config/twitch-bot-config';
import {ImdbSearch} from './view/imdb-search/imdb-search';
import {BackgroundWebglExample} from "./view/background/background-webgl-example/background-webgl-example";
import {LoginLandingDesktop} from "./view/login/login-landing-desktop/login-landing-desktop";
import {ContactUsIndex} from './view/contact-us/contact-us-index/contact-us-index.component';
import {ContactUsNewFeedback} from './view/contact-us/contact-us-new-feedback/contact-us-new-feedback';
import {ContactUsFeedbackDetails} from './view/contact-us/contact-us-feedback-details/contact-us-feedback-details';
import {ContactUsAdmin} from './view/contact-us/contact-us-admin/contact-us-admin';

export const routes: Routes = [
  {path: '', component: TwitchBotIndex},
  {path: 'home', component: TwitchBotIndex}, // For google redirect
  {path: 'background', component: BackgroundWebglExample},
  {path: 'user/auth', component: LoginIndex},
  {path: 'user/login', component: LoginLandingWeb},
  {path: 'user/login/desktop', component: LoginLandingDesktop},
  {path: 'vm-admin', component: VmManager, canActivate: [authGuard]},
  {path: 'contact-us', component: ContactUsIndex, canActivate: [authGuard]},
  {path: 'contact-us-admin', component: ContactUsAdmin, canActivate: [authGuard]},
  {path: 'contact-us/feedback', component: ContactUsNewFeedback, canActivate: [authGuard]},
  {path: 'contact-us/feedback/:id', component: ContactUsFeedbackDetails, canActivate: [authGuard]},
  {path: 'twitch/bot', component: TwitchBotIndex},
  {path: 'twitch/bot/config', component: TwitchBotConfig},
  {path: 'imdb-search', component: ImdbSearch},
  {path: '**', component: NotFound},
];
