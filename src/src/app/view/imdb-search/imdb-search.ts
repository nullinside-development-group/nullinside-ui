import {Component, inject, OnDestroy, signal, WritableSignal} from '@angular/core';
import {Logo} from '../../common/components/logo/logo';
import {NullinsideNull} from '../../service/nullinside-null';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {LoadingIcon} from '../../common/components/loading-icon/loading-icon';
import {Subscription} from 'rxjs';
import {ImdbSearchItems} from '../../common/interface/imdb-search';

@Component({
  selector: 'app-imdb-search',
  imports: [
    Logo,
    MatFormFieldModule,
    MatInput,
    MatButton,
    LoadingIcon
  ],
  templateUrl: './imdb-search.html',
  styleUrl: './imdb-search.scss',
  standalone: true
})
export class ImdbSearch implements OnDestroy {
  private api = inject(NullinsideNull);

  searching: WritableSignal<boolean> = signal(false);
  quickSubscription: Subscription | null = null;
  longSubscription: Subscription | null = null;
  public rows: WritableSignal<ImdbSearchItems[]> = signal([]);

  ngOnDestroy(): void {
    if (this.quickSubscription) {
      this.quickSubscription.unsubscribe();
    }

    if (this.longSubscription) {
      this.longSubscription.unsubscribe();
    }
  }

  onSearch(search: string) {
    this.searching.set(true);
    this.quickSubscription = this.api.getImdbSearchQuick(search)
      .subscribe({
        next: value => {
          this.rows.set(value.items || []);
          this.searching.set(false);
        },
        error: _ => {
          this.rows.set([]);
          this.searching.set(false);
        },
      })
  }
}
