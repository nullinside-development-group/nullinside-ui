import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StandardBanner} from './common/components/standard-banner/standard-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StandardBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nullinside');
}
