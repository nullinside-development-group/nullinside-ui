import {Component, OnDestroy} from '@angular/core';
import {LogoComponent} from '../../common/components/logo/logo.component';
import {NullinsideNullService} from '../../service/nullinside-null.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {LoadingIconComponent} from '../../common/components/loading-icon/loading-icon.component';
import {Subscription} from 'rxjs';
import {ImdbSearchItems} from '../../common/interface/imdb-search';

@Component({
  selector: 'app-imdb-search',
  imports: [
    LogoComponent,
    MatFormFieldModule,
    MatInput,
    MatButton,
    LoadingIconComponent
  ],
  templateUrl: './imdb-search.component.html',
  styleUrl: './imdb-search.component.scss'
})
export class ImdbSearchComponent implements OnDestroy {
  searching: boolean = false;
  quickSubscription: Subscription | null = null;
  longSubscription: Subscription | null = null;
  public rows: ImdbSearchItems[] = [];

  constructor(private api: NullinsideNullService) {

  }

  ngOnDestroy(): void {
    if (this.quickSubscription) {
      this.quickSubscription.unsubscribe();
    }

    if (this.longSubscription) {
      this.longSubscription.unsubscribe();
    }
  }

  onSearch(search: string) {
    this.searching = true;
    this.quickSubscription = this.api.getImdbSearchQuick(search)
      .subscribe({
        next: value => {
          this.rows = value.items || [];
          this.searching = false;
        },
        error: _ => {
          this.rows = [];
          this.searching = false;
        },
      })
  }
}
