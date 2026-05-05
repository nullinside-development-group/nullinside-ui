import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

import {ImdbSearch} from './imdb-search';

describe('ImdbSearch', () => {
  let component: ImdbSearch;
  let fixture: ComponentFixture<ImdbSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImdbSearch],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImdbSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
