import {Component, OnDestroy, OnInit} from '@angular/core';
import {audit, Observable, of, Subscription} from "rxjs";
import {ProductsService} from "../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Product} from "../interfaces/Product";
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectOneProduct} from "../state/selectors/product.selectors";
import {addToCart, deleteProduct, getProduct} from "../state/actions/product.actions";
import {ProductInCart} from "../interfaces/ProductInCart";
import {selectLoggedInUser} from "../state/selectors/login.selectors";
import {User} from "../interfaces/User";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product | undefined;
  id: number | undefined;
  userIsAdmin = false;
  userIsCustomer = false;
  user: User | undefined;

  productSubs: Subscription | undefined

  quantityForm: FormGroup = new FormGroup({
    quantity: new FormControl(''),
  })

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  public productDetails$ = this.store.select(selectOneProduct)
  public user$ = this.store.select(selectLoggedInUser)
  userSubs : Subscription | undefined

  ngOnInit(): void {
    this.getProduct();
    this.getUserRoles();
  }

  ngOnDestroy() {
    this.productSubs?.unsubscribe()
    this.userSubs?.unsubscribe()
  }

  getProduct(): void {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(getProduct({id: this.id}))
    this.productSubs = this.productDetails$.subscribe((product) => this.product = product)
  }

  getUserRoles() {
    this.userSubs = this.user$.subscribe((user) => this.user = user)
    this.userIsAdmin = !!this.user?.roles.includes('admin');
    this.userIsCustomer = !!this.user?.roles.includes('customer');
  }

  goBack(): void {
    this.router.navigate(["show_products"]).then();
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({ id }))
    this.goBack()
  }

  addToCartButtonPressed() {
    const formValue = this.quantityForm.value;
    if(this.product) {
      const productToAdd: ProductInCart = {
        product: this.product,
        quantity: formValue.quantity
      }
      this.store.dispatch(addToCart({productToAdd}))
      this.goBack()
    }
  }
}
