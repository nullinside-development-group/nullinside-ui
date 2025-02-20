import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackgroundWebglExampleComponent} from './background-webgl-example.component';

describe('BackgroundWebglExampleComponent', () => {
  let component: BackgroundWebglExampleComponent;
  let fixture: ComponentFixture<BackgroundWebglExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundWebglExampleComponent]
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
