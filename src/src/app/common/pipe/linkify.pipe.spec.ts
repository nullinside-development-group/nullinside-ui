import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
import {LinkifyPipe} from './linkify.pipe';

describe('LinkifyPipe', () => {
  let pipe: LinkifyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LinkifyPipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
          },
        },
      ],
    });
    pipe = TestBed.inject(LinkifyPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if value is null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return null if value is undefined', () => {
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('should return same string if no links', () => {
    const text = 'Hello world';
    expect(pipe.transform(text)).toBe(text);
  });

  it('should linkify a simple http link', () => {
    const text = 'Check out http://example.com';
    const expected = 'Check out <a href="http://example.com" target="_blank" rel="noopener noreferrer">http://example.com</a>';
    expect(pipe.transform(text)).toBe(expected);
  });

  it('should linkify a simple https link', () => {
    const text = 'Check out https://example.com';
    const expected = 'Check out <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>';
    expect(pipe.transform(text)).toBe(expected);
  });

  it('should linkify multiple links', () => {
    const text = 'Go to https://google.com and https://bing.com';
    const expected = 'Go to <a href="https://google.com" target="_blank" rel="noopener noreferrer">https://google.com</a> and <a href="https://bing.com" target="_blank" rel="noopener noreferrer">https://bing.com</a>';
    expect(pipe.transform(text)).toBe(expected);
  });

  it('should escape HTML tags in the input', () => {
    const text = '<script>alert("xss")</script> https://example.com';
    const expected = '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>';
    expect(pipe.transform(text)).toBe(expected);
  });
});
