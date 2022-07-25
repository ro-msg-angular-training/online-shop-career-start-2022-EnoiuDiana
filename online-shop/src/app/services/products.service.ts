import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../product-interfaces/Product";
import {ProductDisplay} from "../product-interfaces/ProductDisplay";
import {ProductAdd} from "../product-interfaces/ProductAdd";
import {ProductInCart} from "../product-interfaces/ProductInCart";
import {ProductCheckoutData} from "../product-interfaces/ProductCheckoutData";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsAddedToCart: ProductInCart[] = []

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<ProductDisplay[]>(environment.ROOT_URL + "/products")
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(environment.ROOT_URL + "/products/" + id);
  }

  deleteProductById(id: number) {
    return this.http.delete<string>(environment.ROOT_URL + "/products/" + id)
  }

  checkout(data: ProductCheckoutData) {
    return this.http.post(environment.ROOT_URL + "/orders", data, { responseType: 'text' })
  }

  updateProducts(id: number | undefined, data: any) {
    return this.http.put<string>(environment.ROOT_URL + "/products/" + id, data)
  }

  addProduct(data: ProductAdd): Observable<Product>{
    return this.http.post<Product>(environment.ROOT_URL + "/products", data, { responseType: 'json' })
  }

  deleteProductsFromCart() {
    this.productsAddedToCart = []
  }
}
