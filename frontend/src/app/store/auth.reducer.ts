import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    error: string | null;
    isLoading: boolean;

}

export const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    error: null,
    isLoading: false

};

export const authReducer = createReducer(
    initialState,
    // sign up
    on(AuthActions.signupRequest, (state) => ({ ...state, error: null, isLoading: true })), 
    on(AuthActions.signupSuccess, (state, {username, accessToken }) => ({ ...state, error: null, isLoading: false, username, accessToken })),
    on(AuthActions.signupFailure, (state, { error }) => ({ ...state, error })),
    // login 
    on(AuthActions.loginRequest, (state) => ({ ...state, isLoading: true })),
    on(AuthActions.loginSuccess, (state, { accessToken }) => ({ ...state, isAuthenticated: true, accessToken, error: null, isLoading: false })),
    on(AuthActions.loginFailure, (state, { error }) => ({ ...state, isAuthenticated: false, accessToken: null, error })),
    // logout
    on(AuthActions.logout,AuthActions.autoLogout, () => initialState),
    // intiate auth
    on(AuthActions.initAuth, (state) => ({ ...state, isLoading: true })),

    // load Products 
    on(AuthActions.loadProducts, (state, { accessToken }) => ({ ...state, error: null, isLoading: false, isAuthenticated: true , accessToken})),
    on(AuthActions.loadProductsSuccess, (state, { Products }) => ({ 
        ...state, 
        error: null,
        isLoading: false , 
        isAuthenticated: true,
        Products
    })),
    on(AuthActions.loadProductsFailure, (state, { error }) => ({ ...state, error, isLoading: false })),

);