import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import linkifyHtml from 'linkify-html';

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml | null {
    if (!value) {
      return null;
    }

    const linkified = linkifyHtml(value, {
      defaultProtocol: 'https',
    });
    return DOMPurify.sanitize(linkified);
  }
}
