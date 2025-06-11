import { Route } from '@angular/router';
import { SigninComponent } from './signin.component.ts/signin.component';
import { SignupComponent } from './signup.component.ts/signup.component';
import { authGuard } from './auth.guard';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' }
];
