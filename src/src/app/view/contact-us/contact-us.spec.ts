import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {ContactUs} from './contact-us';

describe('ContactUs', () => {
  let component: ContactUs;
  let fixture: ComponentFixture<ContactUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUs],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {queryParams: of({})}
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
