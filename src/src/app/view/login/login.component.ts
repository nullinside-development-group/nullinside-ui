import {Component, OnInit} from '@angular/core';
import {LogoComponent} from "../../common/components/logo/logo.component";
import {environment} from "../../../environments/environment";
import {NullinsideService} from "../../service/nullinside.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LoadingIconComponent} from "../../common/components/loading-icon/loading-icon.component";
import {HttpErrorResponse} from '@angular/common/http';
import {TwitchLoginComponent} from '../../common/components/twitch-login/twitch-login.component';

@Component({
  selector: 'app-login',
  imports: [
    LogoComponent,
    LoadingIconComponent,
    TwitchLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginUrl: string;
  checkingLogin = false;
  showGmail = true;
  pageDestinations = [
    '/home'
  ];

  constructor(private api: NullinsideService, private router: Router, private route: ActivatedRoute) {
    this.loginUrl = `${environment.apiUrl}/user/login`;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        const showGmail = params.get('showGmail');
        this.showGmail = null === showGmail || '1' === showGmail;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });

    const token = localStorage.getItem('auth-token');
    if (!token) {
      return;
    }

    this.checkingLogin = true;
    this.api.validateToken(token || '')
      .subscribe({
        next: _ => {
          this.router.navigate([this.pageDestinations[0]]);
        },
        error: _ => {
          this.checkingLogin = false;
        }
      });
  }

  protected readonly environment = environment;
}
