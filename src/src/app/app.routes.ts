import { Routes } from '@angular/router';
import { NotFoundComponent } from "./view/not-found/not-found.component";
import { IndexComponent } from "./view/index/index.component";
import { GoogleLoginLandingComponent } from "./view/google-login-landing/google-login-landing.component";
import { HomeComponent } from "./view/home/home.component";
import { authGuardGuard } from "./middleware/auth-guard.guard";

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'google/login', component: GoogleLoginLandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuardGuard]},
  {path: '**', component: NotFoundComponent},
];
