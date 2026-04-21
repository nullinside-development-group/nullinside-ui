import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import {ContactUsList} from '../common/contact-us-list/contact-us-list';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {ContactUsFeedback} from '../../../common/interface/contact-us-feedback';

@Component({
  selector: 'app-contact-us-admin',
  imports: [
    ContactUsList,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './contact-us-admin.html',
  styleUrl: './contact-us-admin.scss',
})
export class ContactUsAdmin {
  public feedbackList: WritableSignal<ContactUsFeedback[] | null> = signal(null);
  public uniqueUsers: Signal<{ userId: number, email: string | null }[]> = computed(() => {
    const list = this.feedbackList();
    if (!list) {
      return [];
    }

    return Array.from(
      new Map(list.map(f => [f.userId, {userId: f.userId, email: f.email}])).values()
    );
  });
  public filterUserId = signal(-1);
  public filterProduct = signal('');
  public filterStatus = signal('');

  protected onFeedbackListUpdate(feedback: ContactUsFeedback[] | null) {
    this.feedbackList.set(feedback);
  }

  protected onUserFilterChange(value: MatSelectChange<number>) {
    this.filterUserId.set(value.value);
  }

  protected onUserProductFilterChange(value: MatSelectChange<string>) {
    this.filterProduct.set(value.value);
  }

  protected onStatusFilterChange(value: MatSelectChange<string>) {
    this.filterStatus.set(value.value);
  }
}
