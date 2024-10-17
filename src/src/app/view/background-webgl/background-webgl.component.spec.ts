import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundWebglComponent } from './background-webgl.component';

describe('BackgroundWebglComponent', () => {
  let component: BackgroundWebglComponent;
  let fixture: ComponentFixture<BackgroundWebglComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundWebglComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundWebglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
