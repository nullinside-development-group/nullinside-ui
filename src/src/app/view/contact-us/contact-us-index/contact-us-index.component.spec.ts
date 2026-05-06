import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {ContactUsIndex} from './contact-us-index.component';

describe('ContactUs', () => {
  let component: ContactUsIndex;
  let fixture: ComponentFixture<ContactUsIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsIndex],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {queryParams: of({})}
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactUsIndex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
