import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VmManagerComponent} from './vm-manager.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('VmManagerComponent', () => {
  let component: VmManagerComponent;
  let fixture: ComponentFixture<VmManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VmManagerComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
