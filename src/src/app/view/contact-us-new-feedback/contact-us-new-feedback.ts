import {Component, inject, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Nullinside} from '../../service/nullinside';
import {ContactUsSubmitFeedback} from '../../common/interface/contact-us-submit-feedback';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us-new-feedback',
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatError
  ],
  templateUrl: './contact-us-new-feedback.html',
  styleUrl: './contact-us-new-feedback.scss',
})
export class ContactUsNewFeedback {
  private router = inject(Router);
  private api = inject(Nullinside);
  public formBuilder = inject(FormBuilder);
  public formGroup = this.formBuilder.group({
    'product': [null, [Validators.required, Validators.maxLength(50)]],
    'message': [null, [Validators.required, Validators.maxLength(10000)]],
  });
  public error = signal('');

  protected onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    const feedback: ContactUsSubmitFeedback = {
      product: `${this.formGroup.value.product}`,
      message: `${this.formGroup.value.message}`
    };

    this.api.addNewContactUsFeedback(feedback).subscribe({
      next: success => {
        if (success) {
          this.router.navigate(['/contact-us'], {queryParams: {'submitted-feedback': true}});
        } else {
          this.error.set('Failed to submit your feedback, please try again');
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
