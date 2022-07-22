import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {AuthService} from "../auth.service";
import {Product} from "../Product";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {loadProducts} from "../state/products/product.actions";
import {selectAllProducts, selectProducts} from "../state/products/product.selectors";
import {AppState} from "../state/app.state";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(private productsService: ProductsService,
              private auth: AuthService,
              private store: Store<AppState>) {}


  public allProducts$ = this.store.select(selectAllProducts);

  productsSubs: Subscription | undefined


  ngOnInit(): void {
    this.store.dispatch(loadProducts())
  }

  ngOnDestroy() {
  }


}
