import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbSearchComponent } from './imdb-search.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ImdbSearchComponent', () => {
  let component: ImdbSearchComponent;
  let fixture: ComponentFixture<ImdbSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImdbSearchComponent, HttpClientTestingModule, BrowserAnimationsModule]
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
