import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  imports: [
    MatButton
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs {
  private router = inject(Router);

  onCreateFeedback() {
    this.router.navigate(['/contact-us/feedback']);
  }
}
