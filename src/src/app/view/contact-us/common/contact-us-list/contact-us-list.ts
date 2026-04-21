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
  public admin = input(false);
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
    if (this.admin()) {
      this.api.getAllSubmittedContactUsFeedbackAdmin().subscribe({
        next: feedback => {
          feedback.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
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
          feedback.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
          this.allFeedback = [...feedback];
          this.onFilterFeedback();
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

  protected readonly ContactUsFeedbackStatus = ContactUsFeedbackStatus;
}
