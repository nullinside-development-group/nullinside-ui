import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TwitchStreamCarousel} from './twitch-stream-carousel';

describe('TwitchStreamCarousel', () => {
  let component: TwitchStreamCarousel;
  let fixture: ComponentFixture<TwitchStreamCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitchStreamCarousel]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwitchStreamCarousel);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('streams', [
      {
        id: '1',
        username: 'user1',
        title: 'title1',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 100,
        twitchId: '1'
      },
      {
        id: '2',
        username: 'user2',
        title: 'title2',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 200,
        twitchId: '2'
      }
    ]);
    fixture.componentRef.setInput('rotationInterval', 1000);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rotate index over time and bounce back at edges', () => {
    // Set up more streams to test the bounce
    fixture.componentRef.setInput('streams', [
      {
        id: '1',
        username: 'user1',
        title: 'title1',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 100,
        twitchId: '1'
      },
      {
        id: '2',
        username: 'user2',
        title: 'title2',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 200,
        twitchId: '2'
      },
      {
        id: '3',
        username: 'user3',
        title: 'title3',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 300,
        twitchId: '3'
      }
    ]);
    fixture.detectChanges();

    // With 0 container width, maxIndex will be count - 1 = 2
    expect(component.currentIndex()).toBe(0);

    component.rotate();
    expect(component.currentIndex()).toBe(1);

    component.rotate();
    expect(component.currentIndex()).toBe(2);

    component.rotate();
    expect(component.currentIndex()).toBe(1); // Bounce back

    component.rotate();
    expect(component.currentIndex()).toBe(0); // Bounce back to start

    component.rotate();
    expect(component.currentIndex()).toBe(1); // Forward again
  });

  it('should scroll manually when buttons are clicked', () => {
    fixture.componentRef.setInput('streams', [
      {
        id: '1',
        username: 'user1',
        title: 'title1',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 100,
        twitchId: '1'
      },
      {
        id: '2',
        username: 'user2',
        title: 'title2',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 200,
        twitchId: '2'
      },
      {
        id: '3',
        username: 'user3',
        title: 'title3',
        thumbnailUrl: 'https://placehold.co/200x112',
        viewerCount: 300,
        twitchId: '3'
      }
    ]);
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(0);

    // Click right
    const nextButton = fixture.nativeElement.querySelector('.next');
    nextButton.click();
    fixture.detectChanges();
    expect(component.currentIndex()).toBe(1);

    // Click right again
    fixture.nativeElement.querySelector('.next').click();
    fixture.detectChanges();
    expect(component.currentIndex()).toBe(2);

    // Click left
    const prevButton = fixture.nativeElement.querySelector('.prev');
    prevButton.click();
    fixture.detectChanges();
    expect(component.currentIndex()).toBe(1);

    // Verify direction changed
    expect(component.direction()).toBe(-1);
  });

  it('should show the correct number of counters', () => {
    const counters = fixture.nativeElement.querySelectorAll('.view-count');
    expect(counters.length).toBe(2);
    expect(counters[0].textContent).toContain('1');
    expect(counters[1].textContent).toContain('2');
  });
});
