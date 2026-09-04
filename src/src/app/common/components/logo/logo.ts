import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-logo',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})
export class Logo {
  private router = inject(Router);

  @Input() height = 50;

  sendToIndex() {
    void this.router.navigate(['/']);
  }
}
