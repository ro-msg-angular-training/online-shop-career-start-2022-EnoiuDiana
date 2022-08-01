import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {ProductState} from "../reducers/product.reducer";
import {selectProducts} from "./product.selectors";
import {LoginState} from "../reducers/login.reducer";

export const selectLogin = (state: AppState) => state.login;

export const selectLoggedInUser = createSelector(
  selectLogin,
  (state: LoginState) => state.loggedInUser
)
