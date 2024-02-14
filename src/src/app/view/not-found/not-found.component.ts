import { Component } from '@angular/core';
import { LogoComponent } from "../../common/logo/logo.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
