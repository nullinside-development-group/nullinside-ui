import {Component} from '@angular/core';
import {BackgroundWebgl} from "../background-webgl/background-webgl";
import {StandardBanner} from "../../common/components/standard-banner/standard-banner";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {OpenGlBackgrounds} from "./backgrounds";

@Component({
  selector: 'app-background-webgl-example',
  imports: [
    BackgroundWebgl,
    StandardBanner,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './background-webgl-example.html',
  styleUrl: './background-webgl-example.scss',
  standalone: true
})
export class BackgroundWebglExample {
  public enum: OpenGlBackgrounds = OpenGlBackgrounds.BOX;
  protected readonly OpenGlBackgrounds = OpenGlBackgrounds;
}
