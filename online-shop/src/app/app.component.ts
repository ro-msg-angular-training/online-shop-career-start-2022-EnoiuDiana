import { Component , OnInit} from '@angular/core';
import {VERSION} from "@angular/compiler";
import {AuthService} from "./services/auth.service";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = `online-shop ${VERSION.full}`;


  constructor() {
  }

  ngOnInit(): void {

  }


}
