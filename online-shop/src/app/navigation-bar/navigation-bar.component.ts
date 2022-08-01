import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {selectLoggedInUser} from "../state/selectors/login.selectors";
import {User} from "../interfaces/User";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  public user$ = this.store.select(selectLoggedInUser)
  user : User | undefined
  userSubs: Subscription | undefined

  ngOnInit(): void {
    this.user$.subscribe((user) => this.user = user)
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe()
  }

  isUserCustomer() {
    return this.user?.roles.includes('customer');
  }

  isUserAdmin() {
    return this.user?.roles.includes('admin');
  }
}
