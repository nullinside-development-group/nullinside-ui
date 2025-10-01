import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackgroundWebglExampleComponent} from './background-webgl-example.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('BackgroundWebglExampleComponent', () => {
  let component: BackgroundWebglExampleComponent;
  let fixture: ComponentFixture<BackgroundWebglExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundWebglExampleComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackgroundWebglExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
