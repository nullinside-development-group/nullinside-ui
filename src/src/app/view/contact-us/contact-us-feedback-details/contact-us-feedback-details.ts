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

import {ContactUsFeedbackStatus} from '../../../common/interface/contact-us-feedback-status';
import {forkJoin} from 'rxjs';
import {environment} from '../../../../environments/environment';

import {LinkifyPipe} from '../../../common/pipe/linkify.pipe';

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
    LoadingIcon,
    LinkifyPipe
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
  protected isAdmin = signal(false);
  protected readonly ContactUsFeedbackStatus = ContactUsFeedbackStatus;

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
        this.isAdmin.set(-1 !== roles.roles.indexOf('ADMIN'));
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

        this.sendReadReceipts(feedback);
      },
      error: err => {
        console.error(err);
        this.error.set('Failed to load feedback details');
      }
    });
  }

  private sendReadReceipts(feedback: ContactUsFeedback) {
    const readTasks = [];
    readTasks.push(this.api.readFeedback(feedback.id));
    feedback.comments.forEach(c => {
      readTasks.push(this.api.readFeedbackComment(c.id));
    });

    forkJoin(readTasks).subscribe({
      error: err => {
        console.error(err);
        this.error.set('Failed to send read receipts');
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
	
	this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.error.set('An error occurred while adding the comment');
        this.loading.set(false);
      }
    });
  }

  protected onBackButton() {
    if (this.isAdmin()) {
      this.router.navigate(['/contact-us/admin']);
    } else {
      this.router.navigate(['/contact-us']);
    }
  }

  protected onUpdateFeedback(feedback: ContactUsFeedback, status: ContactUsFeedbackStatus) {
    this.loading.set(true);
    this.api.updateContactUsFeedbackStatus(feedback.id, status).subscribe({
      next: () => {
        this.loadFeedback(feedback.id);
        this.loading.set(false);
      },
      error: err => {
        console.error('Failed to complete feedback:', err);
        this.error.set('Failed to complete feedback, please try again');
        this.loading.set(false);
      }
    })
  }

  protected readonly environment = environment;
}
