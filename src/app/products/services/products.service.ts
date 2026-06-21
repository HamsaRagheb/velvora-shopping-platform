import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
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
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.http
      .get<Product[]>(`${environment.baseUrl}/products`)
      .subscribe((products) => this.productsSubject.next(products));
  }

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
    return combineLatest([this.search$, this.productsSubject]).pipe(
      debounceTime(300),
      map(([query, products]) => {
        if (query.trim() === '') return [];
        const lowerQuery = query.toLowerCase();
        return products.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery),
        );
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
