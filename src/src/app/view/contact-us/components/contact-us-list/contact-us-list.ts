import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {TimestampPipe} from '../../../../common/pipe/timestamp.pipe';
import {Router} from '@angular/router';
import {Nullinside} from '../../../../service/nullinside';
import {ContactUsFeedback} from '../../../../common/interface/contact-us-feedback';
import {ContactUsFeedbackStatus} from '../../../../common/interface/contact-us-feedback-status';
import {environment} from '../../../../../environments/environment';

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
  private allFeedback: ContactUsFeedback[] = [];
  public isAdmin = input(false);
  public filterByUserId = input(-1);
  public filterByProduct = input('');
  public filterByStatus = input('');
  public filterEffect = effect(() => {
    // Subscribe to changes of all three inputs
    this.filterByUserId();
    this.filterByProduct();
    this.filterByStatus();

    // Re-filter when any input changes
    this.onFilterFeedback();
  });
  public feedbackList: OutputEmitterRef<ContactUsFeedback[] | null> = output()
  public feedbackSubmitted: WritableSignal<ContactUsFeedback[] | null> = signal(null);
  public feedbackSubmittedFiltered: WritableSignal<ContactUsFeedback[] | null> = signal(null);

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.api.getAllSubmittedContactUsFeedbackAdmin().subscribe({
        next: feedback => {
          feedback = this.sortFeedback(feedback);
          this.allFeedback = [...feedback];
          this.onFilterFeedback();
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.api.getAllSubmittedContactUsFeedback().subscribe({
        next: feedback => {
          feedback = this.sortFeedback(feedback);
          this.allFeedback = [...feedback];
          this.onFilterFeedback();
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

  private sortFeedback(feedback: ContactUsFeedback[]): ContactUsFeedback[] {
    // First, go through each piece of feedback and determine the latest timestamp for action taken. This can either
    // be just a posting with no comments (in which case we take the posting timestamp) or it can be a posting with
    // comments in which case we take the timestamp of the soonest comment.
    //
    // This will ensure what has been updated most recently trickles to the top of the list regardless of original
    // submission date.
    const allFeedback = feedback.map(f => {
      let compareStamp = f.timestamp;
      f.comments.forEach(comment => {
        if (comment.timestamp > compareStamp) {
          compareStamp = comment.timestamp;
        }
      });

      return {
        ...f,
        compareStamp
      };
    });

    allFeedback.sort((a, b) => b.compareStamp.getTime() - a.compareStamp.getTime());
    return allFeedback;
  }

  onFeedbackClicked(id: number) {
    this.router.navigate(['/contact-us/feedback/' + id]);
  }

  onFilterFeedback() {
    let filteredFeedback = [...this.allFeedback];
    if (-1 !== this.filterByUserId()) {
      filteredFeedback = filteredFeedback.filter(feedback => feedback.userId === this.filterByUserId());
    }

    if (this.filterByProduct()) {
      filteredFeedback = filteredFeedback.filter(feedback => feedback.product === this.filterByProduct());
    }

    if (this.filterByStatus()) {
      filteredFeedback = filteredFeedback.filter(feedback => feedback.status === this.filterByStatus());
    }

    this.feedbackSubmitted.set(filteredFeedback);
    this.feedbackList.emit(this.allFeedback);
    this.feedbackSubmittedFiltered.set(filteredFeedback);
  }

  getFeedbackClass(feedback: ContactUsFeedback): string {
    if (!feedback) {
      return '';
    }

    if (!feedback.isRead || feedback.comments.some(comment => !comment.isRead)) {
      return 'unread';
    }

    if (ContactUsFeedbackStatus.Completed.toString() === feedback.status.toString()) {
      return 'completed';
    }

    if (ContactUsFeedbackStatus.Closed.toString() === feedback.status.toString()) {
      return 'closed';
    }

    return '';
  }

  getFeedbackUserIdentifier(feedback: ContactUsFeedback): string {
    if (!environment.showEmailForAdmins || !this.isAdmin()) {
      return '';
    }

    return feedback.email ? feedback.email : feedback.userId.toString();
  }

  protected readonly ContactUsFeedbackStatus = ContactUsFeedbackStatus;
}
