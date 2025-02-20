import {Routes} from '@angular/router';
import {NotFoundComponent} from "./view/not-found/not-found.component";
import {LoginLandingComponent} from "./view/login-landing/login-landing.component";
import {HomeComponent} from "./view/home/home.component";
import {authGuard} from "./middleware/auth.guard";
import {VmManagerComponent} from './view/vm-manager/vm-manager.component';
import {LoginComponent} from './view/login/login.component';
import {TwitchBotIndexComponent} from './view/twitch/twitch-bot-index/twitch-bot-index.component';
import {TwitchBotConfigComponent} from './view/twitch/twitch-bot-config/twitch-bot-config.component';
import {ImdbSearchComponent} from './view/imdb-search/imdb-search.component';
import {BackgroundWebglExampleComponent} from "./view/background-webgl-example/background-webgl-example.component";
import {LoginLandingDesktopComponent} from "./view/login-landing-desktop/login-landing-desktop.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'background', component: BackgroundWebglExampleComponent},
  {path: 'user/auth', component: LoginComponent},
  {path: 'user/login', component: LoginLandingComponent},
  {path: 'user/login/desktop', component: LoginLandingDesktopComponent},
  {path: 'home', component: HomeComponent},
  {path: 'vm-admin', component: VmManagerComponent, canActivate: [authGuard]},
  {path: 'twitch-bot', component: TwitchBotIndexComponent},
  {path: 'twitch-bot/config', component: TwitchBotConfigComponent},
  {path: 'imdb-search', component: ImdbSearchComponent},
  {path: '**', component: NotFoundComponent},
];
