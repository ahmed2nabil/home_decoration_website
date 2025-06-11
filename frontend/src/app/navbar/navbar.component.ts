import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AuthState } from '../store/auth.reducer';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
      RouterOutlet, 
      RouterLink, 
      MatToolbarModule,
      MatButtonModule, 
      MatSidenavModule ,
      MatIcon, MatListModule, 
      FlexLayoutModule, 
      NavbarComponent,
      CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router, private store: Store<{ auth: AuthState }>) {
    this.isLoggedIn$ = this.store.select((state) => state.auth.isAuthenticated);;

  }

  ngOnInit() : void {}

  signOut() {
      this.store.dispatch(AuthActions.logout())
  }
}
