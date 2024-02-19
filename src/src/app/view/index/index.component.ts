import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../../common/logo/logo.component";
import { GoogleSignInResponse } from "../../common/interface/google-sign-in-response";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LogoComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  ngOnInit(): void {
    (window as any).handleGoogleLogin = (response: GoogleSignInResponse) => {
      this.handleGoogleLogin(response);
    }
  }

  handleGoogleLogin(args: GoogleSignInResponse) {
    console.log(args);
  }
}
