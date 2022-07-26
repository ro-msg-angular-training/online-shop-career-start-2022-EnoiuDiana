import {createAction, props} from "@ngrx/store";
import {UserCredentials} from "../../interfaces/UserCredentials";
import {User} from "../../interfaces/User";

export const login = createAction('[Login Page] Login',
  props<{userCredentials: UserCredentials}>()
)

export const loginSuccessful = createAction(
  '[Login API] Login successful',
  props<{loggedInUser: User}>()
)

export const loginFailure = createAction(
  '[Login API] Login failure',
  props<{error: string}>()
)
