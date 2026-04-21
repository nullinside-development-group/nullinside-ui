import {Component, inject, input, OnInit, signal, WritableSignal} from '@angular/core';
import {TimestampPipe} from '../../../../common/pipe/timestamp.pipe';
import {Router} from '@angular/router';
import {Nullinside} from '../../../../service/nullinside';
import {ContactUsFeedback} from '../../../../common/interface/contact-us-feedback';

@Component({
  selector: 'app-contact-us-list',
  imports: [
    TimestampPipe
  ],
  templateUrl: './contact-us-list.html',
  styleUrl: './contact-us-list.scss',
})
export class ContactUsList implements OnInit {
  private router = inject(Router);
  private api = inject(Nullinside);
  public admin = input(false);
  public feedbackSubmitted: WritableSignal<ContactUsFeedback[] | null> = signal(null);

  ngOnInit(): void {
    if (this.admin()) {
      this.api.getAllSubmittedContactUsFeedbackAdmin().subscribe({
        next: feedback => {
          feedback.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
          this.feedbackSubmitted.set(feedback);
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
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
  }

  onFeedbackClicked(id: number) {
    this.router.navigate(['/contact-us/feedback/' + id]);
  }
}
