import { Routes } from '@angular/router';
import { NotFoundComponent } from "./view/not-found/not-found.component";
import { IndexComponent } from "./view/index/index.component";

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: '**', component: NotFoundComponent},
];
