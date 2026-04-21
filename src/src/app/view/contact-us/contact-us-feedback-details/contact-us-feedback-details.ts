import {Component, inject, OnInit, signal, viewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Nullinside} from '../../../service/nullinside';
import {ContactUsFeedback} from '../../../common/interface/contact-us-feedback';
import {FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatButton} from '@angular/material/button';
import {TimestampPipe} from '../../../common/pipe/timestamp.pipe';
import {LoadingIcon} from '../../../common/components/loading-icon/loading-icon';
import {Auth} from '../../../service/auth';

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
    TimestampPipe,
    LoadingIcon
  ],
  templateUrl: './contact-us-feedback-details.html',
  styleUrl: './contact-us-feedback-details.scss',
})
export class ContactUsFeedbackDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(Nullinside);
  private auth = inject(Auth);
  private formBuilder = inject(FormBuilder);
  private commentFormDirective = viewChild(FormGroupDirective);
  private isAdmin = false;

  public loading = signal(false);
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

    this.auth.getUserRoles().subscribe({
      next: roles => {
        this.isAdmin = -1 !== roles.roles.indexOf('ADMIN');
      },
      error: err => {
        console.error('Failed to load user roles', err);
      }
    });
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

    this.loading.set(true);
    const message = this.commentForm.value.message!;
    this.api.addContactUsFeedbackComment(this.feedback()!.id, message).subscribe({
      next: success => {
        if (success) {
          this.commentFormDirective()?.resetForm();
          this.loadFeedback(this.feedback()!.id);
        } else {
          this.error.set('Failed to add comment, please try again');
        }
      },
      error: err => {
        console.error(err);
        this.error.set('An error occurred while adding the comment');
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  protected onBackButton() {
    if (this.isAdmin) {
      this.router.navigate(['/contact-us/admin']);
    } else {
      this.router.navigate(['/contact-us']);
    }
  }
}
