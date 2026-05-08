import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
} from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [];
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  updateSearch(query: string) {
    this.searchSubject.next(query);
  }
  getFilteredProducts(): Observable<Product[]> {
    return this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((query) => {
        if (query.trim() === '') return [];

        const lowerQuery = query.toLowerCase();

        return this.products
          .filter((product) => {
            return (
              product.title.toLowerCase().includes(lowerQuery) ||
              product.category.toLowerCase().includes(lowerQuery)
            );
          })
          .slice(0, 4);
      }),
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.baseUrl}/products/categories`,
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.baseUrl}/products/category/${category}`,
    );
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.baseUrl}/products/${productId}`,
    );
  }

  getStars(rate: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('fa-star');
    }

    if (halfStar) {
      stars.push('fa-star-half-stroke');
    }

    while (stars.length < 5) {
      stars.push('fa-star empty');
    }

    return stars;
  }
}
