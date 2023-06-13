import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from '../state/state';
import * as action from '../action/actions'


export const authReducer = createReducer(
  initialAuthState,
  on(action.loginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user
  })),
  on(action.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error
  })),
  on(action.signupSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user
  })),
  on(action.signupFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error
  }))
);
