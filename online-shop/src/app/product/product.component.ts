import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {AuthService} from "../services/auth.service";
import {Product} from "../interfaces/Product";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {loadProducts} from "../state/actions/product.actions";
import {selectAllProducts} from "../state/selectors/product.selectors";
import {AppState} from "../state/app.state";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) {}


  public allProducts$ = this.store.select(selectAllProducts);


  ngOnInit(): void {
    this.store.dispatch(loadProducts())
  }

  ngOnDestroy() {
  }


}
