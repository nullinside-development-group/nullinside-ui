import { Component, Input } from '@angular/core';

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
}
