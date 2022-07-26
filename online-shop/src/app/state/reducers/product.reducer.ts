import { Product} from "../../interfaces/Product";
import {createReducer, on} from "@ngrx/store";
import {
  addProduct,
  addProductFailure,
  addProductSuccess, addToCart, checkout, checkoutFailure, checkoutSuccess, deleteFromCart,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  editProduct, editProductFailure, editProductSuccess,
  getProduct,
  getProductFailure,
  getProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess
} from "../actions/product.actions";
import {ProductDisplay} from "../../interfaces/ProductDisplay";
import {ProductInCart} from "../../interfaces/ProductInCart";

export interface ProductState {

  products: ProductDisplay[];
  productDetails: Product | undefined;
  productsInCart: ProductInCart[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';

}

export const initialState: ProductState = {
  products: [],
  productDetails: undefined,
  productsInCart: [],
  error: null,
  status: 'pending'
}

export const productReducer = createReducer(

  // Supply the initial state
  initialState,

  // Trigger loading the products
  on(loadProducts, (state) => ({ ...state, status: 'loading' })),

  // Handle successfully loaded products
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    error: null,
    status: 'success',
  })),

  // Handle products load failure
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(getProduct, (state) => ({...state, status: 'loading'})),

  on(getProductSuccess, (state, { product }) => ({
    ...state,
    productDetails: product,
    error: null,
    status: 'success',
  })),

  on(getProductFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(addProduct, (state) => ({
    ...state,
    status: 'loading'
   })),

  on(addProductSuccess, (state) => ({
    ...state,
    status: 'success'
  })),
  on(addProductFailure, (state) => ({
    ...state,
    status: 'error'
  })),

  on(deleteProduct, (state) => ({
    ...state,
    status: 'loading'
  })),

  on(deleteProductSuccess, (state) => ({
    ...state,
    status: 'success'
  })),

  on(deleteProductFailure, (state) => ({
    ...state,
    status: 'error'
  })),

  on(editProduct, (state) => ({
    ...state,
    status: 'loading'
  })),

  on(editProductSuccess, (state) => ({
    ...state,
    status: 'success'
  })),

  on(editProductFailure, (state) => ({
    ...state,
    status: 'error'
  })),

  on(addToCart, (state, {productToAdd}) => ({
    ...state,
    productsInCart: [...state.productsInCart, productToAdd ],
    status: 'success'
  })),

  on(deleteFromCart, (state) => ({
    ...state,
    productsInCart: [],
    status: 'success'
  })),

  on(checkout, (state) => ({
    ...state,
    status: 'loading'
  })),

  on(checkoutSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success'
  })),

  on(checkoutFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error'
  }))

)
