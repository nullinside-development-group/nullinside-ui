import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

import {ContactUsList} from './contact-us-list';

describe('ContactUsList', () => {
  let component: ContactUsList;
  let fixture: ComponentFixture<ContactUsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactUsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
