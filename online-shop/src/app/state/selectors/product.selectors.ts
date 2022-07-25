import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductState } from "../reducers/product.reducer";

export const selectProducts = (state: AppState) => state.products;

export const selectAllProducts = createSelector(
  selectProducts,
  (state: ProductState) => state.products
)

export const selectOneProduct = createSelector(
  selectProducts,
  (state: ProductState) => state.productDetails
)

export const selectProductsInCart = createSelector(
  selectProducts,
  (state: ProductState) => state.productsInCart
)
