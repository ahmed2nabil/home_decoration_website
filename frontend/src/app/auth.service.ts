import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private authUrl = `${this.apiUrl}/auth`;
    private logoutTimer: any;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private store: Store
    ) {}

    signup(username: string, password: string, email: string): Observable<any> {
        return this.http.post(`${this.authUrl}/signup`, { username, password, email }).pipe(
            tap((response: any) => {
                this.handleAuthentication(response.accessToken, response.expiresIn);
            }),
            catchError(this.handleError)
        );
    }

    signin(username: string, password: string): Observable<any> {
        return this.http.post(`${this.authUrl}/signin`, { username, password }).pipe(
            tap((response: any) => {
                this.handleAuthentication(response.accessToken, response.expiresIn);
            }),
            catchError(this.handleError)
        );
    }

    signout() {
        try {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('expiration');
            if (this.logoutTimer) {
                clearTimeout(this.logoutTimer);
            }
            this.router.navigate(['/signin']);
            ;
        } catch (error) {
            console.error('Error during signout:', error);
        }
    }

    autoLogin() { 
        const authData = this.getAuthData();
        if (!authData) {
            return;
        }
        const expirationDate = new Date(authData.expirationDate);
        if (expirationDate <= new Date()) {
            return;
        }
        this.store.dispatch(AuthActions.loadProducts({ accessToken: authData.token }));
        this.setLogoutTimer(this.getExpirationDuration(expirationDate));

    }

    private handleAuthentication(token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        this.setAuthData(token, expirationDate);
        this.setLogoutTimer(expiresIn);
    }

    private setAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private getAuthData(): { token: string; expirationDate: string } | null {
        const token = localStorage.getItem('auth_token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return null;
        }
        return {
            token: token,
            expirationDate: expirationDate
        };
    }

    private setLogoutTimer(expiresIn: number) {
        this.logoutTimer = setTimeout(() => {
            this.signout();
        }, expiresIn * 1000);
    }

    private getExpirationDuration(expirationDate: Date): number {
        const now = new Date().getTime();
        const expirationTime = expirationDate.getTime();
        return (expirationTime - now) / 1000;
    }

    private handleError(error: any) {
        let errorObject = {name: 'Error', message: 'An unknown error occurred!', status: 0};
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorObject.message = `Error: ${error.error.message}`;
        } else {
            // Backend error
            errorObject.message = `Error: ${error.error ? error.error.message : error.message}`;
            errorObject.status = error.status;
        }
        console.error(errorObject);
        return throwError(() => new customError(errorObject.name, errorObject.message, errorObject.status));
    }
}

class customError implements Error { 
    name: string;
    message: string;
    status: number;
    constructor(name: string, message: string, status: number) {
        this.name = name;
        this.message = message;
        this.status = status;
    }
} 