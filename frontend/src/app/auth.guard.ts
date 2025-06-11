import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

export const authGuard = () => {
    const store = inject(Store<{ auth: { isAuthenticated: boolean } }>);
    const router = inject(Router);

    return store.select(state => state.auth.isAuthenticated).pipe(
        take(1),
        map(isAuthenticated => {
        if (isAuthenticated) {
            return true;
        } else {
            router.navigate(['/signin']);
            return false;
        }
        })
    );
    };