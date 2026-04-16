import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsNewFeedback } from './contact-us-new-feedback';

describe('ContactUsNewFeedback', () => {
  let component: ContactUsNewFeedback;
  let fixture: ComponentFixture<ContactUsNewFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsNewFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsNewFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
