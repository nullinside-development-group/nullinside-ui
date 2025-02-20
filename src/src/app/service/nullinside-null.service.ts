import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ImdbSearch} from '../common/interface/imdb-search';

@Injectable({
  providedIn: 'root'
})
export class NullinsideNullService {
  constructor(private httpClient: HttpClient) {
  }

  getImdbSearchQuick(search: string): Observable<ImdbSearch> {
    return this.httpClient.get<ImdbSearch>(`${environment.nullApiUrl}/imdb/search/quick?search=${search}`);
  }
}
