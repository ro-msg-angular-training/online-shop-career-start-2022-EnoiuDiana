import { Component } from '@angular/core';
import {VERSION} from "@angular/compiler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `online-shop ${VERSION.full}`;
}
