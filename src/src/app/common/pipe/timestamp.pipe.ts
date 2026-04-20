import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: Date | null | undefined): string | null {
    if (!value) {
      return null;
    }

    return `${value.toLocaleDateString()} ${value.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }
}
