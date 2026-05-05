import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

import {ContactUsNewFeedback} from './contact-us-new-feedback';

describe('ContactUsNewFeedback', () => {
  let component: ContactUsNewFeedback;
  let fixture: ComponentFixture<ContactUsNewFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsNewFeedback],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
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
