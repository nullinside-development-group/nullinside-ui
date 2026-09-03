import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AutoScrollingChat} from './auto-scrolling-chat';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('AutoScrollingChat', () => {
  let component: AutoScrollingChat;
  let fixture: ComponentFixture<AutoScrollingChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoScrollingChat],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AutoScrollingChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
