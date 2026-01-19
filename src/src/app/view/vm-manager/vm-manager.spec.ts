import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VmManager} from './vm-manager';

describe('VmManager', () => {
  let component: VmManager;
  let fixture: ComponentFixture<VmManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VmManager]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VmManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
