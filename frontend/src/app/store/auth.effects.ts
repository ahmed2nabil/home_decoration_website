import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap} from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupRequest),
            mergeMap((action) =>
                this.authService.signup(action.username, action.password, action.email).pipe(
                    map((response: any) => AuthActions.loadProducts({ accessToken: response.accessToken })),
                    catchError((error) => of(AuthActions.signupFailure({ error: error })))
                )
            )
        )
    );
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginRequest),
            mergeMap((action) =>
                this.authService.signin(action.username, action.password).pipe(
                    map((response: any) => AuthActions.loadProducts({ accessToken: response.accessToken })),
                    catchError((error) => of(AuthActions.loginFailure({ error: error })))
                )
            )
        )
    );


    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadProducts),
            tap(() => this.router.navigate(['/products']))
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                this.authService.signout();
            })
        ),
        { dispatch: false }
    );
    initAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuth),
            switchMap(() => {
                const authData = this.getAuthData();
                if (authData) {
                    return of(AuthActions.loadProducts({ accessToken: authData }));
                } else {
                    return of(AuthActions.logout());
                }
            })
        )
    );
    navigateToHome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.navigateToHome),
            tap(() => this.router.navigate(['/home']))
        ),
        { dispatch: false }
    );

    private getAuthData(): string | null {
        return localStorage.getItem('auth_token');
    }
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}
}