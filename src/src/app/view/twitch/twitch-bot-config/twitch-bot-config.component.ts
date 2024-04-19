import { Component } from '@angular/core';
import { LogoComponent } from '../../../common/components/logo/logo.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-twitch-bot-config',
  standalone: true,
  imports: [
    LogoComponent,
    MatButton
  ],
  templateUrl: './twitch-bot-config.component.html',
  styleUrl: './twitch-bot-config.component.scss'
})
export class TwitchBotConfigComponent {

}
