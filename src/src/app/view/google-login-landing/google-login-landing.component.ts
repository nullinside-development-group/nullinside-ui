import { Component, OnInit } from '@angular/core';
import { NullinsideService } from "../../service/nullinside.service";
import { LogoComponent } from "../../common/components/logo/logo.component";
import { LoadingIconComponent } from "../../common/components/loading-icon/loading-icon.component";

@Component({
  selector: 'app-google-login-landing',
  standalone: true,
  imports: [
    LogoComponent,
    LoadingIconComponent
  ],
  templateUrl: './google-login-landing.component.html',
  styleUrl: './google-login-landing.component.scss'
})
export class GoogleLoginLandingComponent implements OnInit {
  constructor(private api: NullinsideService) {
  }

  ngOnInit(): void {

  }
}
