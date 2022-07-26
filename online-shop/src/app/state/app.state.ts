
import { ProductState } from "./reducers/product.reducer";
import {LoginState} from "./reducers/login.reducer";

export interface AppState {
  products: ProductState;
  login: LoginState;
}
