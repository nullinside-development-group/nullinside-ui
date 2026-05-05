import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  signal,
  viewChild
} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TwitchLiveBotUsers} from '../../interface/twitch-live-bot-users';
import {TimespanDiffPipe} from '../../pipe/timespan-diff-pipe';

@Component({
  selector: 'app-twitch-stream-carousel',
  imports: [NgOptimizedImage, TimespanDiffPipe],
  templateUrl: './twitch-stream-carousel.html',
  styleUrl: './twitch-stream-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwitchStreamCarousel {
  private container = viewChild<ElementRef<HTMLDivElement>>('container');
  private containerWidth = signal(0);
  streams = input<TwitchLiveBotUsers[]>([]);
  gap = input(20)
  currentIndex = signal(0);
  rotationInterval = input(5000);
  direction = signal(1); // 1 for forward, -1 for backward
  skipCalls = signal(0);
  streamWidth = input(640)
  streamHeight = input(360)

  maxIndex = computed(() => {
    // The maximum index is actually the number of streams minus the number of streams we can show in a single row.
    // Think about it from the carousel perspective: if we have 10 streams and can show 3 at a time, the max index is 7.
    // If we went higher than 7 then there would be blank space to the right of the carousel.
    const count = this.streams().length;
    if (count === 0) {
      return 0;
    }

    const containerWidth = this.containerWidth();
    const itemWidth = this.streamWidth();
    const fullItemWidth = itemWidth + this.gap();

    // If we can't figure out the container width, just use the maximum number of items, it'll allow people to scroll
    // past the end but at least it will function.
    if (containerWidth === 0) {
      return Math.max(0, count - 1);
    }

    // The visible items is the total number of things we have minus the number of things we can show in a single row.
    const visibleItems = Math.floor((containerWidth + this.gap()) / fullItemWidth);
    return Math.max(0, count - visibleItems);
  });

  visibleStreams = computed(() => {
    return this.streams();
  });

  constructor() {
    afterNextRender(() => {
      this.onResize();
    });

    effect((onCleanup) => {
      const interval = setInterval(() => {
        if (this.skipCalls() > 0) {
          this.skipCalls.set(this.skipCalls() - 1);
          return;
        }

        this.rotate();
      }, this.rotationInterval());

      onCleanup(() => {
        clearInterval(interval);
      });
    });
  }

  @HostListener('window:resize')
  onResize() {
    const width = this.container()?.nativeElement.clientWidth || 0;
    if (width !== this.containerWidth()) {
      this.containerWidth.set(width);
    }

    // If the window is now larger and showing blank space on the right side, reset the index so everything
    // scrolls back into view correctly.
    if (this.maxIndex() < this.currentIndex()) {
      this.currentIndex.set(this.maxIndex());
      return;
    }
  }

  rotate() {
    const max = this.maxIndex();
    if (max <= 0) {
      this.currentIndex.set(0);
      return;
    }

    const current = this.currentIndex();
    let nextDirection = this.direction();

    if (current >= max) {
      nextDirection = -1;
    } else if (current <= 0) {
      nextDirection = 1;
    }

    this.direction.set(nextDirection);
    this.currentIndex.update((index) => Math.min(max, Math.max(0, index + nextDirection)));
  }

  scrollLeft() {
    this.currentIndex.update((index) => Math.max(0, index - 1));
    this.direction.set(-1);
    this.skipCalls.set(2);
  }

  scrollRight() {
    const max = this.maxIndex();
    this.currentIndex.update((index) => Math.min(max, index + 1));
    this.direction.set(1);
    this.skipCalls.set(2);
  }

  protected readonly Date = Date;

  protected onStreamClicked(stream: TwitchLiveBotUsers) {
    window.open(`https://twitch.tv/${stream.username}`, '_blank');
  }
}
