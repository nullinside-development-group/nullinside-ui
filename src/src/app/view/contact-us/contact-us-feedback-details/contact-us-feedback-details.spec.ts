import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactUsFeedbackDetails} from './contact-us-feedback-details';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('ContactUsFeedbackDetails', () => {
  let component: ContactUsFeedbackDetails;
  let fixture: ComponentFixture<ContactUsFeedbackDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsFeedbackDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: (_: string) => null
              }
            }
          }
        }
      ]
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
