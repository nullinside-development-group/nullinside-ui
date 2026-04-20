import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Nullinside} from '../../service/nullinside';
import {ContactUsFeedback} from '../../common/interface/contact-us-feedback';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatButton} from '@angular/material/button';
import {TimestampPipe} from '../../common/pipe/timestamp.pipe';

@Component({
  selector: 'app-contact-us-feedback-details',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    CdkTextareaAutosize,
    MatButton,
    TimestampPipe
  ],
  templateUrl: './contact-us-feedback-details.html',
  styleUrl: './contact-us-feedback-details.scss',
})
export class ContactUsFeedbackDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(Nullinside);
  private formBuilder = inject(FormBuilder);

  public feedback = signal<ContactUsFeedback | null>(null);
  public error = signal('');
  public commentForm = this.formBuilder.group({
    'message': ['', [Validators.required, Validators.maxLength(10000)]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFeedback(Number(id));
    }
  }

  private loadFeedback(id: number) {
    this.api.getSubmittedContactUsFeedback(id).subscribe({
      next: feedback => {
        if (feedback) {
          feedback.comments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
          this.feedback.set(feedback);
        } else {
          this.error.set('Feedback not found');
        }
      },
      error: err => {
        console.error(err);
        this.error.set('Failed to load feedback details');
      }
    });
  }

  protected onSubmitComment() {
    if (!this.commentForm.valid || !this.feedback()) {
      return;
    }

    const message = this.commentForm.value.message!;
    this.api.addContactUsFeedbackComment(this.feedback()!.id, message).subscribe({
      next: success => {
        if (success) {
          this.commentForm.reset();
          this.loadFeedback(this.feedback()!.id);
        } else {
          this.error.set('Failed to add comment, please try again');
        }
      },
      error: err => {
        console.error(err);
        this.error.set('An error occurred while adding the comment');
      }
    });
  }
}
