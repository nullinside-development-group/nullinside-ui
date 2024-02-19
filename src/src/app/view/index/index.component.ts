import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../../common/components/logo/logo.component";
import { environment } from "../../../environments/environment";

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
  loginUrl: string;

  constructor() {
    this.loginUrl = `${environment.apiUrl}/user/login`;
  }

  ngOnInit(): void {

  }
}
