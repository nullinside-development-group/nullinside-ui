import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LogoComponent} from '../../common/components/logo/logo.component';
import {NullinsideService} from '../../service/nullinside.service';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {LoadingIconComponent} from '../../common/components/loading-icon/loading-icon.component';
import {interval, Subscription} from 'rxjs';
import {ActionableDockerResource} from './interface/ActionableDockerResource';

@Component({
  selector: 'app-vm-manager',
  imports: [
    LogoComponent,
    MatIcon,
    MatTooltip,
    LoadingIconComponent
  ],
  templateUrl: './vm-manager.component.html',
  styleUrl: './vm-manager.component.scss'
})
export class VmManagerComponent implements OnInit, OnDestroy {
  private api = inject(NullinsideService);

  public vms: ActionableDockerResource[] | null = null;
  public error: string | null = null;
  private timer: Subscription | null = null;

  ngOnInit(): void {
    this.getVms();

    this.timer = interval(5000)
      .subscribe({
        next: _ => {
          this.getVms();
        },
        error: _ => {
          this.error = "Failed to refresh the list, the server may be down...";
        }
      });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }

  getVms() {
    this.api.getVirtualMachines()
      .subscribe({
        next: vms => {
          this.error = null;
          const actionableVms: ActionableDockerResource[] = [];
          vms.forEach(vms => {
            const existing = this.vms?.find(v => v.id === vms.id);
            if (existing) {
              let running = existing.isRunning;
              if (existing.isRunning && existing.isOnline !== vms.isOnline) {
                running = false;
              }

              actionableVms.push({isRunning: running, ...vms});
            } else {
              actionableVms.push({isRunning: false, ...vms});
            }
          });

          this.vms = actionableVms;
        },
        error: _ => {
          this.error = "Failed to reach out to get the virtual machines, please try again...";
        }
      })
  }

  onSwitchPower(id: number, turnOn: boolean) {
    const existing = this.vms?.find(v => v.id === id);
    if (!existing) {
      return;
    }

    existing.isRunning = true;
    this.api.setVirtualMachinePowerState(id, turnOn)
      .subscribe({
        next: success => {
          existing.isRunning = false;

          if (!success) {
            this.error = "Failed to start/stop the machine, please try again...";
            return;
          }

          // Assume it worked until the next silent refresh
          existing.isOnline = turnOn;
        },
        error: _ => {
          this.error = "Failed to start/stop the machine, please try again...";
          existing.isRunning = false;
        }
      })
  }
}
