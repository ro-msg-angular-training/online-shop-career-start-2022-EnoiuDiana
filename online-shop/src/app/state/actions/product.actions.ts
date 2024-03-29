import { createAction, props } from '@ngrx/store';
import {ProductDisplay} from "../../interfaces/ProductDisplay";
import {Product} from "../../interfaces/Product";
import {ProductAdd} from "../../interfaces/ProductAdd";
import {ProductInCart} from "../../interfaces/ProductInCart";
import {ProductCheckoutData} from "../../interfaces/ProductCheckoutData";


//show products
export const loadProducts = createAction('[Show Products Page] Load Products')

export const loadProductsSuccess = createAction(
  '[Product API] Products Load Success',
  props<{ products: ProductDisplay[] }>()
);

export const failure = createAction(
  '[Product API] Failure',
  props<{ error: string }>()
);

//product details
export const getProduct = createAction(
  '[Product Details Page] Get product',
  props<{ id: number }>()
)

export const getProductSuccess = createAction(
  '[Product API] Get Product Success',
  props<{product: Product}>()
)


//add product
export const addProduct = createAction(
  '[Add Product Page] Add product',
  props<{product: ProductAdd}>()
)

export const addProductSuccess = createAction(
  '[Product API] Add product success',
  props<{product: Product}>()
)


//delete product
export const deleteProduct = createAction(
  '[Product Details Page] Delete product',
  props<{id: number}>()
)

export const deleteProductSuccess = createAction(
  '[Product API] Delete product success',
  props<{response: string}>()
)


//edit product
export const editProduct = createAction(
  '[Edit Product Page] Edit product',
  props<{id: number, product: Product}>()
)

export const editProductSuccess = createAction(
  '[Product API] Edit product success',
  props<{response: string}>()
)


//add to cart product
export const addToCart = createAction(
  '[Product Details Page] Add to Cart',
  props<{productToAdd: ProductInCart}>()
)

//delete product from cart
export const deleteFromCart = createAction(
  '[Shopping Cart Page] Delete From Cart'
)

//place order
export const checkout = createAction(
  '[Shopping Cart Page] Place Order',
  props<{productCheckoutData: ProductCheckoutData}>()
)

export const checkoutSuccess = createAction(
  '[Product API] Checkout success',
  props<{response: string}>()
)

