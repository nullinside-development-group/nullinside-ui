import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

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
  public formBuilder = inject(FormBuilder);
  public formGroup = this.formBuilder.group({
    'product': [null, Validators.required],
    'message': [null, Validators.required],
  });

  protected onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    console.log('feedbackData: ' + JSON.stringify(this.formGroup.value));
  }
}
