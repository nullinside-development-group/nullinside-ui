import {Component} from '@angular/core';
import {BackgroundWebglComponent} from "../background-webgl/background-webgl.component";
import {StandardBannerComponent} from "../../common/components/standard-banner/standard-banner.component";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {OpenGlBackgrounds} from "./backgrounds";

@Component({
  selector: 'app-background-webgl-example',
  imports: [
    BackgroundWebglComponent,
    StandardBannerComponent,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './background-webgl-example.component.html',
  styleUrl: './background-webgl-example.component.scss'
})
export class BackgroundWebglExampleComponent {
  public enum: OpenGlBackgrounds = OpenGlBackgrounds.BOX;
  protected readonly OpenGlBackgrounds = OpenGlBackgrounds;
}
