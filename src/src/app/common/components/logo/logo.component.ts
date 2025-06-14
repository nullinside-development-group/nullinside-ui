import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  private router = inject(Router);

  @Input() height: number = 50;
  @Input() fontSize: number = 35;
  @Input() words: string[] = ['inside ;', 'tests ;', 'inside  ;', 'quality ;'];

  sendToIndex() {
    this.router.navigate(['/']);
  }
}
