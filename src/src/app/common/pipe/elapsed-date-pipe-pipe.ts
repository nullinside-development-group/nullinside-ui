import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'elapsedDatePipe',
})
export class ElapsedDatePipePipe implements PipeTransform {
  transform(value: Date | null | undefined): string {
    if (!value) {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const elapsedSeconds = Math.max(
      0,
      Math.floor((Date.now() - date.getTime()) / 1000)
    );

    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    return `${hours.toString()}h ${minutes.toString()}m ${seconds.toString()}s`;
  }
}
