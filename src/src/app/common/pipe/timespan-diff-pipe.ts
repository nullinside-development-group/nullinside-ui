import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timespanDiff',
})
export class TimespanDiffPipe implements PipeTransform {

  transform(value: Date | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const currentUtc = new Date().getTime() - value.getTime();
    const seconds = Math.floor(currentUtc / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  }
}
