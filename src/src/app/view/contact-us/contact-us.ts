import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {Nullinside} from '../../service/nullinside';
import {ContactUsFeedback} from '../../common/interface/contact-us-feedback';

@Component({
  selector: 'app-contact-us',
  imports: [
    MatButton
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs implements OnInit {
  private api = inject(Nullinside);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public submittedFeedback = signal(false);
  public feedbackSubmitted: WritableSignal<ContactUsFeedback[]> = signal([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['submitted-feedback']) {
        this.submittedFeedback.set(true);
      }
    });

    this.api.getAllSubmittedContactUsFeedback().subscribe({
      next: feedback => {
        feedback.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        this.feedbackSubmitted.set(feedback);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onCreateFeedback() {
    this.router.navigate(['/contact-us/feedback']);
  }

  onFeedbackClicked(id: number) {
    this.router.navigate(['/contact-us/feedback/' + id]);
  }
}
