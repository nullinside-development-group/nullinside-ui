import { Routes } from '@angular/router';
import { NotFoundComponent } from "./view/not-found/not-found.component";
import { IndexComponent } from "./view/index/index.component";
import { LoginLandingComponent } from "./view/login-landing/login-landing.component";
import { HomeComponent } from "./view/home/home.component";
import { authGuard } from "./middleware/auth.guard";
import { VmManagerComponent } from './view/vm-manager/vm-manager.component';

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'user/login', component: LoginLandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'vm-admin', component: VmManagerComponent, canActivate: [authGuard]},
  {path: '**', component: NotFoundComponent},
];
