import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimatedList} from './animated-list.component';

describe('TwitchBotNameList', () => {
  let component: AnimatedList;
  let fixture: ComponentFixture<AnimatedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimatedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
