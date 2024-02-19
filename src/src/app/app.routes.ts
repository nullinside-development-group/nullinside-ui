import { Routes } from '@angular/router';
import { NotFoundComponent } from "./view/not-found/not-found.component";
import { IndexComponent } from "./view/index/index.component";
import { GoogleLoginLandingComponent } from "./view/google-login-landing/google-login-landing.component";

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'google/login', component: GoogleLoginLandingComponent},
  {path: '**', component: NotFoundComponent},
];
