import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductState } from "./product.reducer";

export const selectProducts = (state: AppState) => state.products;

export const selectAllProducts = createSelector(
  selectProducts,
  (state: ProductState) => state.products
)
