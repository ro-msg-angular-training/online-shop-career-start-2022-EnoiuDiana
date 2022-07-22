import { createAction, props } from '@ngrx/store';
import {ProductDisplay} from "../../ProductDisplay";

export const loadProducts = createAction('[Show Products Page] Load Products')

export const loadProductsSuccess = createAction(
  '[Product API] Products Load Success',
  props<{ products: ProductDisplay[] }>()
);

export const loadProductsFailure = createAction(
  '[Product API] Products Load Failure',
  props<{ error: string }>()
);
