import { Component, OnInit } from '@angular/core';
import { NullinsideService } from "../../service/nullinside.service";

@Component({
  selector: 'app-google-login-landing',
  standalone: true,
  imports: [],
  templateUrl: './google-login-landing.component.html',
  styleUrl: './google-login-landing.component.scss'
})
export class GoogleLoginLandingComponent implements OnInit {
  constructor(private api: NullinsideService) {
  }

  ngOnInit(): void {

  }
}
