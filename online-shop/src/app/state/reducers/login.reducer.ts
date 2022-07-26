import {UserCredentials} from "../../interfaces/UserCredentials";
import {createReducer, on} from "@ngrx/store";
import {login, loginFailure, loginSuccessful} from "../actions/login.actions";
import {User} from "../../interfaces/User";

export interface LoginState {
  loggedInUser: User | undefined;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialLoginState: LoginState = {
  loggedInUser: undefined,
  error: null,
  status: "pending"
}

export const loginReducer = createReducer(
  initialLoginState,

  on(login, (state) => ({ ...state, status: 'loading' })),

  on(loginSuccessful, (state, {loggedInUser}) => ({
    ...state,
    loggedInUser: loggedInUser,
    error: null,
    status: 'success'
  })),

  on(loginFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error'
  }))
)

