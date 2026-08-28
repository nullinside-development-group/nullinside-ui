import {Routes} from '@angular/router';
import {NotFound} from './view/not-found/not-found';
import {LoginLandingWeb} from './view/login/login-landing-web/login-landing-web.component';
import {authGuard} from './middleware/auth-guard';
import {LoginIndex} from './view/login/login-index/login-index.component';
import {TwitchBotIndex} from './view/twitch/twitch-bot-index/twitch-bot-index';
import {BackgroundWebglExample} from './view/background/background-webgl-example/background-webgl-example';
import {LoginLandingDesktop} from './view/login/login-landing-desktop/login-landing-desktop';

export const routes: Routes = [
  {path: '', component: TwitchBotIndex},
  {path: 'home', component: TwitchBotIndex}, // For google redirect
  {path: 'twitch/bot', component: TwitchBotIndex},
  {path: 'background', component: BackgroundWebglExample},
  {path: 'user/auth', component: LoginIndex},
  {path: 'user/login', component: LoginLandingWeb},
  {path: 'user/login/desktop', component: LoginLandingDesktop},
  {
    path: 'vm-admin',
    loadComponent: () => import('./view/vm-manager/vm-manager').then(c => c.VmManager),
    canActivate: [authGuard]
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./view/contact-us/contact-us-index/contact-us-index.component').then(c => c.ContactUsIndex),
    canActivate: [authGuard]
  },
  {
    path: 'contact-us-admin',
    loadComponent: () => import('./view/contact-us/contact-us-admin/contact-us-admin').then(c => c.ContactUsAdmin),
    canActivate: [authGuard]
  },
  {
    path: 'contact-us/feedback',
    loadComponent: () => import('./view/contact-us/contact-us-new-feedback/contact-us-new-feedback').then(c => c.ContactUsNewFeedback),
    canActivate: [authGuard]
  },
  {
    path: 'contact-us/feedback/:id',
    loadComponent: () => import('./view/contact-us/contact-us-feedback-details/contact-us-feedback-details').then(c => c.ContactUsFeedbackDetails),
    canActivate: [authGuard]
  },
  {
    path: 'twitch/bot/config',
    loadComponent: () => import('./view/twitch/twitch-bot-config/twitch-bot-config').then(c => c.TwitchBotConfig)
  },
  {
    path: 'imdb-search',
    loadComponent: () => import('./view/imdb-search/imdb-search').then(c => c.ImdbSearch),
    canActivate: [authGuard]
  },
  {
    path: 'twitch/admin',
    loadComponent: () => import('./view/twitch/twitch-bot-admin/twitch-bot-admin').then(c => c.TwitchBotAdmin),
    canActivate: [authGuard]
  },
  {path: '**', component: NotFound},
];
