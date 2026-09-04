import {Component, DestroyRef, inject, OnInit, output, signal, WritableSignal} from '@angular/core';
import {NullinsideTwitchBot} from '../../../../service/nullinside-twitch-bot';
import {TimeSinceChat} from '../../../../common/interface/time-since-chat';
import {ElapsedDatePipePipe} from '../../../../common/pipe/elapsed-date-pipe-pipe';
import {NgClass} from '@angular/common';

@Component({
  imports: [
    ElapsedDatePipePipe,
    NgClass
  ],
  selector: 'app-time-since-countdown',
  styleUrl: './time-since-countdown.scss',
  templateUrl: './time-since-countdown.html',
})
export class TimeSinceCountdown implements OnInit {
  private api = inject(NullinsideTwitchBot);

  private timer?: number;
  private timerDestroy = inject(DestroyRef);

  protected channels: WritableSignal<TimeSinceChat[]> = signal([]);

  public channelFilterChanged = output<string | null>();
  protected selectedChannelFilter = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
    this.timer = setInterval(() => {
      this.loadData();
    }, 5000);
    this.timerDestroy.onDestroy(() => {
      clearInterval(this.timer);
    });
  }

  loadData(): void {
    this.api.getTimeSinceMessageForAllTwitchChannels().subscribe(response => {
      response.sort((a, b) => a.latestMessage.getTime() - b.latestMessage.getTime());
      this.channels.set(response);
    });
  }

  onChannelToFilterChanged(channel: string): void {
    if (this.selectedChannelFilter() === channel) {
      this.selectedChannelFilter.set(null);
      this.channelFilterChanged.emit(null);
      return;
    }

    this.selectedChannelFilter.set(channel);
    this.channelFilterChanged.emit(channel);
  }
}
