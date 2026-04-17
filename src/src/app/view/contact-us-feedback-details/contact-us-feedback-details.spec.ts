import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsFeedbackDetails } from './contact-us-feedback-details';

describe('ContactUsFeedbackDetails', () => {
  let component: ContactUsFeedbackDetails;
  let fixture: ComponentFixture<ContactUsFeedbackDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsFeedbackDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsFeedbackDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
