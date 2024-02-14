import { Component } from '@angular/core';
import {LogoComponent} from "../../common/logo/logo.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LogoComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
