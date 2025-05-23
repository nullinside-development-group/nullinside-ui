import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingIconComponent} from './loading-icon.component';

describe('LoadingIconComponent', () => {
  let component: LoadingIconComponent;
  let fixture: ComponentFixture<LoadingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingIconComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoadingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
