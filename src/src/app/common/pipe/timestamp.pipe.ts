import {Pipe, PipeTransform} from '@angular/core';
import {convertForDisplay} from '../constants';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: Date | null | undefined): string | null {
    if (!value) {
      return null;
    }

    return convertForDisplay(value);
  }
}
