import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  isUserCustomer() {
    return this.auth.verifyCustomer()
  }

  isUserAdmin() {
    return this.auth.verifyAdmin()
  }
}
