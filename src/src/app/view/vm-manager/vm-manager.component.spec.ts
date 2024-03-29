import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmManagerComponent } from './vm-manager.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VmManagerComponent', () => {
  let component: VmManagerComponent;
  let fixture: ComponentFixture<VmManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VmManagerComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
