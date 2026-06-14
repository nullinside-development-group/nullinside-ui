import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Logo} from "../../common/components/logo/logo";

@Component({
  selector: 'app-not-found',
  imports: [Logo],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class NotFound {

}
