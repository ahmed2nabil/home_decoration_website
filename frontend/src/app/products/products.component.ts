import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatSliderModule} from '@angular/material/slider';
import { MatListModule} from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ 
      CommonModule, 
      MatCardModule, 
      MatGridListModule, 
      MatSliderModule, 
      MatListModule, 
      MatButtonModule,
      MatButtonToggleModule, 
      MatFormFieldModule,
      MatSelectModule,
      MatPaginatorModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit{
  products$!: Observable<Product[]>;
  categories = ['Men', 'Women', 'Children', 'Accessories'];

  sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low'];
  selectedSort = 'Popularity';
  priceRange = 500;
  constructor(private _http: HttpClient,  private store: Store<{ auth: AuthState }>) {}

  ngOnInit(): void {
    this.store.select('auth').pipe(take(1)).subscribe((authState: AuthState) => {
        const accessToken = authState.accessToken;
        if (accessToken) {
          this.products$ = this._http.get<Product[]>('http://localhost:3000/api/productData',
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              }
          );
        }

    })
  }
  onPriceRangeChange(event: any) {
    this.priceRange = event.value;
  }
  getImagePath(imagePath: string): string {
    return `images/${imagePath}`;
  }
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
}