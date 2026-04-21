import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsAdmin } from './contact-us-admin';

describe('ContactUsAdmin', () => {
  let component: ContactUsAdmin;
  let fixture: ComponentFixture<ContactUsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
