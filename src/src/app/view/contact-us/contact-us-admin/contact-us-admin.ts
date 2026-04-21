import {Component} from '@angular/core';
import {ContactUsList} from '../common/contact-us-list/contact-us-list';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-contact-us-admin',
  imports: [
    ContactUsList,
    MatButton
  ],
  templateUrl: './contact-us-admin.html',
  styleUrl: './contact-us-admin.scss',
})
export class ContactUsAdmin {

}
