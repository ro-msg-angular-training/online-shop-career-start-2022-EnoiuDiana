import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProducts,
  loadProductsSuccess,
  getProduct,
  getProductSuccess,
  addProduct,
  addProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  editProduct,
  editProductSuccess,
  checkout, failure
} from '../actions/product.actions';

import { ProductsService } from "../../services/products.service";
import {of, from, concatMap, mergeMap} from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllProducts } from "../selectors/product.selectors";
import { AppState } from '../app.state';
import {ProductDisplay} from "../../interfaces/ProductDisplay";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
          catchError((error) => of(failure({error})))
        )
      )
    )
  );


  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProduct),
      switchMap((action) =>
        from(this.productService.getProductById(action.id)).pipe(
          map((product) => getProductSuccess({product: product})),
          catchError((error) => of(failure({error})))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) =>
        from(this.productService.addProduct(action.product)).pipe(
          map((product) => addProductSuccess({product: product})),
          catchError((error) => of(failure({error})))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) =>
        from(this.productService.deleteProductById(action.id)).pipe(
          map((response) => deleteProductSuccess({response: response})),
          catchError((error) => of(failure({error})))
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      switchMap((action) =>
        from(this.productService.updateProducts(action.id, action.product)).pipe(
          map((response) => editProductSuccess({response: response})),
          catchError((error) => of(failure({error})))
        )
      )
    )
  );

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkout),
      switchMap((action) =>
        from(this.productService.checkout(action.productCheckoutData).pipe(
          map((response) => editProductSuccess({response: response})),
          catchError((error) => of(failure({error})))
        )
      )
    )
  ));
}
