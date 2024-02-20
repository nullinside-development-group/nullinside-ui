import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../../common/components/logo/logo.component";
import { environment } from "../../../environments/environment";
import { NullinsideService } from "../../service/nullinside.service";
import { Router } from "@angular/router";
import { LoadingIconComponent } from "../../common/components/loading-icon/loading-icon.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LogoComponent,
    LoadingIconComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  loginUrl: string;
  checkingLogin = false;

  constructor(private api: NullinsideService, private router: Router) {
    this.loginUrl = `${environment.apiUrl}/user/login`;
  }

  ngOnInit(): void {
    var token = localStorage.getItem('auth-token');
    if (!token) {
      return;
    }

    this.checkingLogin = true;
    this.api.validateToken(token || '')
      .subscribe({
        next: _ => {
          this.router.navigate(['/home']);
        },
        error: _ => {
          this.checkingLogin = false;
        }
      });
  }
}
