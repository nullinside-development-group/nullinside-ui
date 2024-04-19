import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardBannerComponent } from './standard-banner.component';

describe('StandardBannerComponent', () => {
  let component: StandardBannerComponent;
  let fixture: ComponentFixture<StandardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
