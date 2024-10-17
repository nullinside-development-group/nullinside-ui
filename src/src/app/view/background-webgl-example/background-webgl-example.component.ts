import { Component } from '@angular/core';
import {BackgroundWebglComponent} from "../background-webgl/background-webgl.component";
import {StandardBannerComponent} from "../../common/components/standard-banner/standard-banner.component";

@Component({
  selector: 'app-background-webgl-example',
  standalone: true,
  imports: [
    BackgroundWebglComponent,
    StandardBannerComponent
  ],
  templateUrl: './background-webgl-example.component.html',
  styleUrl: './background-webgl-example.component.scss'
})
export class BackgroundWebglExampleComponent {

}
