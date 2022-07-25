import {Component, OnDestroy, OnInit} from '@angular/core';
import {audit, Observable, of, Subscription} from "rxjs";
import {ProductsService} from "../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Product} from "../product-interfaces/Product";
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectOneProduct} from "../state/selectors/product.selectors";
import {addToCart, deleteProduct, getProduct} from "../state/actions/product.actions";
import {ProductInCart} from "../product-interfaces/ProductInCart";

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

  productSubs: Subscription | undefined

  quantityForm: FormGroup = new FormGroup({
    quantity: new FormControl(''),
  })

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private store: Store<AppState>) { }

  public productDetails$ = this.store.select(selectOneProduct)

  ngOnInit(): void {
    this.getProduct();
    this.getUserRoles()
  }

  ngOnDestroy() {
    this.productSubs?.unsubscribe()
  }

  getProduct(): void {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(getProduct({id: this.id}))
    this.productSubs = this.productDetails$.subscribe((product) => this.product = product)
  }

  getUserRoles() {
    this.userIsAdmin = this.auth.verifyAdmin()
    this.userIsCustomer = this.auth.verifyCustomer()
  }

  goBack(): void {
    this.router.navigate(["show_products"]).then();
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({id: id}))
    this.goBack()
  }

  addToCartButtonPressed() {
    const formValue = this.quantityForm.value;
    if(this.product) {
      const productToAdd: ProductInCart = {
        product: this.product,
        quantity: formValue.quantity
      }
      this.store.dispatch(addToCart({productToAdd: productToAdd}))
      this.goBack()
    }
  }
}
