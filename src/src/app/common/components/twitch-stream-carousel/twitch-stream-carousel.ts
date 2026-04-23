import {ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TwitchLiveBotUsers} from '../../interface/twitch-live-bot-users';
import {TimespanDiffPipe} from '../../pipe/timespan-diff-pipe';

export interface TwitchStream {
  id: string;
  userName: string;
  title: string;
  thumbnailUrl: string;
  viewerCount: number;
}

@Component({
  selector: 'app-twitch-stream-carousel',
  imports: [NgOptimizedImage, TimespanDiffPipe],
  templateUrl: './twitch-stream-carousel.html',
  styleUrl: './twitch-stream-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwitchStreamCarousel {
  private elementRef = inject(ElementRef);
  streams = input<TwitchLiveBotUsers[]>([]);
  currentIndex = signal(0);
  rotationInterval = input(5000);
  direction = signal(1); // 1 for forward, -1 for backward
  skipCalls = signal(0);

  maxIndex = computed(() => {
    const count = this.streams().length;
    if (count === 0) return 0;

    const containerWidth = this.elementRef.nativeElement.querySelector('.carousel-container')?.clientWidth || 0;
    const itemWidth = 200;
    const gap = 20;
    const fullItemWidth = itemWidth + gap;

    if (containerWidth === 0) return Math.max(0, count - 1);

    const visibleItems = Math.floor((containerWidth + gap) / fullItemWidth);
    return Math.max(0, count - visibleItems);
  });

  visibleStreams = computed(() => {
    return this.streams();
  });

  constructor() {
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
    window.location.href = `https://twitch.tv/${stream.username}`;
  }
}
