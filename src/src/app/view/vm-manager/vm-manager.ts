import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {interval, Subscription} from 'rxjs';
import {LoadingIcon} from '../../common/components/loading-icon/loading-icon';
import {Logo} from '../../common/components/logo/logo';
import {Nullinside} from '../../service/nullinside';
import {ActionableDockerResource} from '../../common/interface/actionable-docker-resource';

@Component({
  selector: 'app-vm-manager',
  imports: [
    Logo,
    MatIconModule,
    MatTooltip,
    LoadingIcon
  ],
  templateUrl: './vm-manager.html',
  styleUrl: './vm-manager.scss',
  standalone: true
})
export class VmManager implements OnInit, OnDestroy {
  private api = inject(Nullinside);

  public loading: WritableSignal<boolean> = signal(true);
  public vms: WritableSignal<ActionableDockerResource[]> = signal([]);
  public error: WritableSignal<string | null> = signal(null);
  private timer: Subscription | null = null;

  ngOnInit(): void {
    this.getVms();

    this.timer = interval(5000)
      .subscribe({
        next: _ => {
          this.getVms();
        },
        error: _ => {
          this.error.set("Failed to refresh the list, the server may be down...");
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
          this.error.set(null);
          const actionableVms: ActionableDockerResource[] = [];
          vms.forEach(vms => {
            const existing = this.vms()?.find(v => v.id === vms.id);
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

          this.vms.set(actionableVms);
        },
        error: _ => {
          this.error.set("Failed to reach out to get the virtual machines, please try again...");
        },
        complete: () => {
          this.loading.set(false);
        }
      })
  }

  onSwitchPower(id: number, turnOn: boolean) {
    const existing = this.vms()?.find(v => v.id === id);
    if (!existing) {
      return;
    }

    existing.isRunning = true;
    this.api.setVirtualMachinePowerState(id, turnOn)
      .subscribe({
        next: success => {
          existing.isRunning = false;

          if (!success) {
            this.error.set("Failed to start/stop the machine, please try again...");
            return;
          }

          // Assume it worked until the next silent refresh
          existing.isOnline = turnOn;
        },
        error: _ => {
          this.error.set("Failed to start/stop the machine, please try again...");
          existing.isRunning = false;
        }
      })
  }
}
