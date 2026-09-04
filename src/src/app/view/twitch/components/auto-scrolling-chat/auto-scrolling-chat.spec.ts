import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AutoScrollingChat} from './auto-scrolling-chat';

describe('AutoScrollingChat', () => {
  let component: AutoScrollingChat;
  let fixture: ComponentFixture<AutoScrollingChat>;

  beforeEach(async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: vi.fn()
    });

    await TestBed.configureTestingModule({
      imports: [AutoScrollingChat]
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
