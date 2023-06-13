import { createAction, props } from '@ngrx/store';
import { login, User, signUp } from 'src/data';


export const login1 = createAction(
  '[Auth] Login',
  props<{ loginData: login }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ signUpData: signUp }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);
