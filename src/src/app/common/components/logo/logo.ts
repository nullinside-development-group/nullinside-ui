import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  standalone: true
})
export class Logo {
  private router = inject(Router);

  @Input() height = 50;
  @Input() fontSize = 35;
  @Input() words: string[] = ['inside ;', 'tests ;', 'inside  ;', 'quality ;'];

  sendToIndex() {
    this.router.navigate(['/']);
  }
}
