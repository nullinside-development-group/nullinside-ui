import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() height: number = 50;
  @Input() fontSize: number = 35;
  @Input() words: string[] = ['inside ;', 'tests ;', 'inside  ;', 'quality ;'];

  constructor(private router: Router) {
  }

  sendToIndex() {
    this.router.navigate(['/']);
  }
}
