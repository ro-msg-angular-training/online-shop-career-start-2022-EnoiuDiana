import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly ROOT_URL = "http://localhost:3000"

  products: any;

  productsAddedToCart: { product: any, quantity: number }[] = []

  fetchProducts() {
    this.products = this.http.get(this.ROOT_URL + "/products")
  }

  constructor(private http: HttpClient) {
    this.fetchProducts()
  }

  getProducts() {
    return this.products
  }

  getProductById(id: number): Observable<Object> {
    return this.http.get(this.ROOT_URL + "/products/" + id)
  }

  deleteProductById(id: number) {
    console.log('delete called for: ' + this.ROOT_URL + "/products/" + id)
    return this.http.delete(this.ROOT_URL + "/products/" + id)
  }

  checkout(data: any) {
    console.log("place order called")
    return this.http.post(this.ROOT_URL + "/orders", data, { responseType: 'text' })
  }

  updateProducts(id: number, data: any) {
    console.log("update product called")
    return this.http.put(this.ROOT_URL + "/products/" + id, data, { responseType: 'text' })
  }

  addProduct(data: any) {
    console.log("add product called")
    return this.http.post(this.ROOT_URL + "/products", data, { responseType: 'text' })
  }

  addProductToCart(product: any, quantity: number) {
    this.productsAddedToCart.push({product, quantity})
    console.log(this.productsAddedToCart)
  }

  getProductsAddedToCart() {
    return this.productsAddedToCart
  }

  deleteProductsFromCart() {
    this.productsAddedToCart = []
  }


}
