import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'E-commerce';
  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
