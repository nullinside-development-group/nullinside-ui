import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() height: number = 50;
  @Input() fontSize: number = 35;
  @Input() words: string[] = ['inside ;', 'tests ;', 'inside ;', 'quality ;'];

  constructor(private router: Router) {
  }

  sendToIndex() {
    // Need to use window.location here instead of the router because otherwise the external javascript from Google
    // doesn't reload on the index page, and you can't retry your login until you refresh.
    //
    // @ts-expect-error: The expected usage of window.location is to set it directly as a string but due to typing
    // issues that have changed over time the linting complains about it.
    window.location = `${environment.siteUrl}`;
  }
}
