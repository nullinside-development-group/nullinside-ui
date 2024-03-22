import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbSearchComponent } from './imdb-search.component';

describe('ImdbSearchComponent', () => {
  let component: ImdbSearchComponent;
  let fixture: ComponentFixture<ImdbSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImdbSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImdbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
