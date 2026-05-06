import {Component, input} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-animated-list',
  imports: [
    MatTooltip
  ],
  templateUrl: './animated-list.component.html',
  styleUrl: './animated-list.component.scss',
  standalone: true,
})
export class AnimatedList {
  list = input<string[]>([]);
  title = input('');
}
