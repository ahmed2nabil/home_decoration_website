import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FlexLayoutModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, RouterModule],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.css',
})
export class SigninComponent {
    signInForm: FormGroup;
    error$: Observable<any>;

    constructor(private store: Store<{ auth: { error: any } }>, private router: Router, private fb: FormBuilder) {
        this.signInForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
          this.error$ = this.store.select((state) => state.auth.error); // Select auth error
    }

    onSubmit() {
        if (this.signInForm) { 
            const userData = this.signInForm.value;
            this.store.dispatch(AuthActions.loginRequest({ username: userData.username, password: userData.password }));

        }
    }
    goToSignUpPage() {
        this.router.navigate(['/signup']);
    }
}
