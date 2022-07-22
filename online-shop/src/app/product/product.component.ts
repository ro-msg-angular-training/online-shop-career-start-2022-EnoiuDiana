import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {AuthService} from "../auth.service";
import {Product} from "../Product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(private productsService: ProductsService,
              private auth: AuthService) {}

  products: Product[] = [];

  productsSubs: Subscription | undefined

  getProducts(): void {
    this.productsSubs = this.productsService.getProducts().subscribe(products => this.products = products);
  }

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy() {
    this.productsSubs?.unsubscribe()
  }

  getLoggedInState() {
    return this.auth.isLoggedIn
  }

}
