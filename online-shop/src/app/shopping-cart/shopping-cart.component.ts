import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {AuthService} from "../services/auth.service";
import {Product} from "../interfaces/Product";
import {ProductInCart} from "../interfaces/ProductInCart";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {selectProductsInCart} from "../state/selectors/product.selectors";
import {Observable, Subscription} from "rxjs";
import {ProductCheckoutData} from "../interfaces/ProductCheckoutData";
import {checkout, deleteFromCart} from "../state/actions/product.actions";
import {selectLoggedInUser} from "../state/selectors/login.selectors";
import {User} from "../interfaces/User";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  productsInCart: ProductInCart[] = [];

  orderPlaced = false;

  user: User | undefined;

  constructor(private store: Store<AppState>) { }

  public productsInCart$ = this.store.select(selectProductsInCart);

  public user$ = this.store.select(selectLoggedInUser)

  productInCartSubs: Subscription | undefined;

  userSubs: Subscription | undefined;

  ngOnInit(): void {
    this.productInCartSubs = this.productsInCart$.subscribe((productsInCart) =>
      this.productsInCart = productsInCart)
    this.userSubs = this.user$.subscribe((user) => this.user = user)
  }

  ngOnDestroy() {
    this.productInCartSubs?.unsubscribe()
    this.userSubs?.unsubscribe()
  }

  checkout() {
    if(this.user?.username) {
      //extract only the id of products and quantity in an array
      let dataProducts: {productId: number, quantity: number}[] = []
      for(let product1 of this.productsInCart) {
        let productId = product1.product.id
        let quantity = product1.quantity
        dataProducts.push({productId, quantity})
      }

      const data: ProductCheckoutData = {
        "customer": this.user?.username,
        "products": dataProducts
      }

      this.store.dispatch(checkout({productCheckoutData: data}))

      this.store.dispatch(deleteFromCart())

      this.orderPlaced = true;
    }

  }
}
