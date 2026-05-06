import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {Nullinside} from '../../../service/nullinside';
import {ContactUsList} from '../components/contact-us-list/contact-us-list';

@Component({
  selector: 'app-contact-us',
  imports: [
    MatButton,
    ContactUsList
  ],
  templateUrl: './contact-us-index.component.html',
  styleUrl: './contact-us-index.component.scss',
})
export class ContactUsIndex implements OnInit {
  private api = inject(Nullinside);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public submittedFeedback = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['submitted-feedback']) {
        this.submittedFeedback.set(true);
      }
    });
  }

  onCreateFeedback() {
    this.router.navigate(['/contact-us/feedback']);
  }
}
