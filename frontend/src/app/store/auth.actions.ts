import { createAction, props } from '@ngrx/store';
import { Product } from '../products/products.component';
export const signupRequest = createAction('[Auth] Signup Request', props<{ username: string; password: string; email: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ username: string; accessToken: string }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

export const loginRequest = createAction('[Auth] Login Request', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ accessToken: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const loadProducts = createAction('[Auth] Navigate to Products', props<{ accessToken: string }>());
export const loadProductsSuccess = createAction('[Auth] Load Products Success', props<{ Products: Product[] }>());
export const loadProductsFailure = createAction('[Auth]  Load Products Failure', props<{ error: any }>());

export const navigateToHome = createAction('[Auth] Navigate to Home');

export const logout = createAction('[Auth] Logout');
export const autoLogout = createAction('[Auth] Auto Logout'); // For timer-based logout

// Add a new action for initializing the auth state
export const initAuth = createAction('[Auth] Init');