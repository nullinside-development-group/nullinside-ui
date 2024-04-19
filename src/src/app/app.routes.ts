import { Routes } from '@angular/router';
import { NotFoundComponent } from "./view/not-found/not-found.component";
import { LoginLandingComponent } from "./view/login-landing/login-landing.component";
import { HomeComponent } from "./view/home/home.component";
import { authGuard } from "./middleware/auth.guard";
import { VmManagerComponent } from './view/vm-manager/vm-manager.component';
import { LoginComponent } from './view/login/login.component';
import { TwitchBotIndexComponent } from './view/twitch/twitch-bot-index/twitch-bot-index.component';
import { TwitchBotConfigComponent } from './view/twitch/twitch-bot-config/twitch-bot-config.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/auth', component: LoginComponent},
  {path: 'user/login', component: LoginLandingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'vm-admin', component: VmManagerComponent, canActivate: [authGuard]},
  {path: 'twitch-bot/index', component: TwitchBotIndexComponent},
  {path: 'twitch-bot/config', component: TwitchBotConfigComponent, canActivate: [authGuard]},
  {path: '**', component: NotFoundComponent},
];
