import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {AuthService} from "../services/auth.service";
import {Product} from "../product-interfaces/Product";
import {ProductInCart} from "../product-interfaces/ProductInCart";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {selectProductsInCart} from "../state/selectors/product.selectors";
import {Observable, Subscription} from "rxjs";
import {ProductCheckoutData} from "../product-interfaces/ProductCheckoutData";
import {checkout, deleteFromCart} from "../state/actions/product.actions";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  productsInCart: ProductInCart[] = [];

  orderPlaced = false;

  constructor(private productService: ProductsService, private auth: AuthService, private store: Store<AppState>) { }

  public productsInCart$ = this.store.select(selectProductsInCart);

  productInCartSubs: Subscription | undefined;

  ngOnInit(): void {
    this.productInCartSubs = this.productsInCart$.subscribe((productsInCart) =>
      this.productsInCart = productsInCart)
  }

  ngOnDestroy() {
    this.productInCartSubs?.unsubscribe()
  }

  checkout() {
    //extract only the id of products and quantity in an array
    let dataProducts: {productId: number, quantity: number}[] = []
    for(let product1 of this.productsInCart) {
      let productId = product1.product.id
      let quantity = product1.quantity
      dataProducts.push({productId, quantity})
    }

    const data: ProductCheckoutData = {
      "customer": this.auth.getLoggedInUsername(),
      "products": dataProducts
    }

    this.store.dispatch(checkout({productCheckoutData: data}))

    this.store.dispatch(deleteFromCart())

    this.orderPlaced = true;

  }
}
