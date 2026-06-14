import {Component} from '@angular/core';
import {Logo} from "../../common/components/logo/logo";

@Component({
  selector: 'app-not-found',
  imports: [Logo],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  standalone: true
})
export class NotFound {

}
