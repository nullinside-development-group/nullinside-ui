import {Component, inject, OnInit, signal} from '@angular/core';
import {Logo} from "../../common/components/logo/logo";
import {environment} from "../../../environments/environment";
import {Nullinside} from "../../service/nullinside";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LoadingIcon} from "../../common/components/loading-icon/loading-icon";
import {HttpErrorResponse} from '@angular/common/http';
import {TwitchLogin} from '../../common/components/twitch-login/twitch-login';
import {Auth} from "../../service/auth";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  imports: [
    Logo,
    LoadingIcon,
    TwitchLogin
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login implements OnInit {
  private auth = inject(Auth);
  private api = inject(Nullinside);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private metaService: Meta = inject(Meta);
  private titleService: Title = inject(Title);

  checkingLogin = signal(false);
  showGmail = signal(true);
  loginUrl: string;
  pageDestinations = [
    '/home'
  ];

  constructor() {
    this.loginUrl = `${environment.apiUrl}/user/login`;
    this.metaService.updateTag({name: 'description', content: 'Login for access'});
    this.titleService.setTitle("Login");
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        const showGmail = params.get('showGmail');
        this.showGmail.set(null === showGmail || '1' === showGmail);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });

    const token = this.auth.getToken();
    if (!token) {
      return;
    }

    this.checkingLogin.set(true);
    this.auth.validateToken(token || '')
      .subscribe({
        next: _ => {
          this.router.navigate([this.pageDestinations[0]]);
        },
        error: _ => {
          this.checkingLogin.set(false);
        }
      });
  }

  protected readonly environment = environment;
}
