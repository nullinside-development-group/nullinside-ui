import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbSearchComponent } from './imdb-search.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ImdbSearchComponent', () => {
  let component: ImdbSearchComponent;
  let fixture: ComponentFixture<ImdbSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ImdbSearchComponent, BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();

    fixture = TestBed.createComponent(ImdbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
