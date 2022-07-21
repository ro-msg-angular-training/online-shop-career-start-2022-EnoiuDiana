import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private auth: AuthService) {}

  products: any;
  getProducts(): void {
    this.products = this.productsService.getProducts();
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getLoggedInState() {
    return this.auth.isLoggedIn
  }

}
