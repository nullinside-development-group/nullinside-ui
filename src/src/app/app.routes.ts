import { Routes } from '@angular/router';
import { NotFoundComponent } from "./view/not-found/not-found.component";
import { IndexComponent } from "./view/index/index.component";
import { GoogleSigninLandingComponent } from "./view/google-signin-landing/google-signin-landing.component";

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'twitch', component: GoogleSigninLandingComponent},
  {path: '**', component: NotFoundComponent},
];
