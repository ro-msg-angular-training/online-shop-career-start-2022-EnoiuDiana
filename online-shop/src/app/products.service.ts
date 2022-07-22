import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Product} from "./Product";
import {ProductDisplay} from "./ProductDisplay";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsAddedToCart: { product: any, quantity: number }[] = []

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<ProductDisplay[]>(environment.ROOT_URL + "/products")
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(environment.ROOT_URL + "/products/" + id);
  }

  deleteProductById(id: number) {
    return this.http.delete(environment.ROOT_URL + "/products/" + id)
  }

  checkout(data: any) {
    return this.http.post(environment.ROOT_URL + "/orders", data, { responseType: 'text' })
  }

  updateProducts(id: number | undefined, data: any) {
    return this.http.put(environment.ROOT_URL + "/products/" + id, data, { responseType: 'text' })
  }

  addProduct(data: any) {
    return this.http.post(environment.ROOT_URL + "/products", data, { responseType: 'json' })
  }

  addProductToCart(product: any, quantity: number) {
    this.productsAddedToCart.push({product, quantity})
  }

  getProductsAddedToCart() {
    return this.productsAddedToCart
  }

  deleteProductsFromCart() {
    this.productsAddedToCart = []
  }
}
