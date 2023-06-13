import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../state/state";


export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectLoggedIn = createSelector(selectAuthState, (state) => state.user);
export const selectLoading = createSelector(selectAuthState, (state) => state.isLoading);
export const selectError = createSelector(selectAuthState, (state) => state.error);