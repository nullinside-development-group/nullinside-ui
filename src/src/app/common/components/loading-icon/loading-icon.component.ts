import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-icon',
  standalone: true,
  imports: [],
  templateUrl: './loading-icon.component.html',
  styleUrl: './loading-icon.component.scss'
})
export class LoadingIconComponent {
  @Input() marginHack = '0px';
  @Input() width = '100%';
  @Input() height = '100%';
  @Input() fontSize = '14px';
  @Input() fontWeight = 'normal';
  @Input() fill: string | null = '#CCC8AFFF';
}
