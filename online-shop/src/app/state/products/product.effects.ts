import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './product.actions';

import { ProductsService } from "../../products.service";
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllProducts } from "./product.selectors";
import { AppState } from '../app.state';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductsService
  ) {
  }

  // Run this code when a loadProducts action is dispatched
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        // Call the getProducts method, convert it to an observable
        from(this.productService.getProducts()).pipe(
          // Take the returned value and return a new success action containing the products
          map((products) => loadProductsSuccess({products: products})),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadProductsFailure({error})))
        )
      )
    )
  );
}
