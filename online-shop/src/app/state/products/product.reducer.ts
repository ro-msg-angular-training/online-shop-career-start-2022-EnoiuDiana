import { Product} from "../../Product";
import {createReducer, on} from "@ngrx/store";
import {loadProducts, loadProductsFailure, loadProductsSuccess} from "./product.actions";
import {ProductDisplay} from "../../ProductDisplay";

export interface ProductState {

  products: ProductDisplay[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';

}

export const initialState: ProductState = {
  products: [],
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
  }))

)
