import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  productsInCart: {product: any, quantity: number}[] = [];

  orderPlaced = false;

  constructor(private productService: ProductsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.productsInCart = this.productService.getProductsAddedToCart()
  }

  checkout() {
    //extract only the id of products and quantity in an array
    let dataProducts: {productId: any, quantity: number}[] = []
    for(let product1 of this.productsInCart) {
      let productId = product1.product.id
      let quantity = product1.quantity
      dataProducts.push({productId, quantity})
    }

    const data = {
      "customer": this.auth.getLoggedInUsername(),
      "products": dataProducts
    }
    this.productService.checkout(data).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

    this.productService.deleteProductsFromCart()

    this.orderPlaced = true;

  }
}
