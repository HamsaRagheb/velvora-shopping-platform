import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product } from '../../models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly storageKey = 'wishlist';

  private wishlistBehaviourSub: BehaviorSubject<Product[]>;
  private miniWishlistOpen: BehaviorSubject<boolean>;
  miniWishlistOpen$: Observable<boolean>;

  wishlist$: Observable<Product[]>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.wishlistBehaviourSub = new BehaviorSubject<Product[]>(
      this.getProductsFromStorage(),
    );
    this.miniWishlistOpen = new BehaviorSubject<boolean>(false);
    this.wishlist$ = this.wishlistBehaviourSub.asObservable();
    this.miniWishlistOpen$ = this.miniWishlistOpen.asObservable();
  }

  private getProductsFromStorage(): Product[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    return [];
  }

  private saveProductToStorage(products: Product[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
    this.wishlistBehaviourSub.next(products);
  }

  addToWishlist(product: Product) {
    const wishlist = this.wishlistBehaviourSub.getValue();
    const exists = wishlist.some((p) => p.id === product.id);

    if (!exists) {
      this.saveProductToStorage([...wishlist, product]);
      this.openWishlist();
    }
  }

  removeFromWishlist(prodId: number) {
    const wishlist = this.wishlistBehaviourSub
      .getValue()
      .filter((p) => p.id !== prodId);

    this.saveProductToStorage(wishlist);
  }

  clearWishlist() {
    this.saveProductToStorage([]);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistBehaviourSub.getValue().some((p) => p.id === productId);
  }

  toggle(product: Product) {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }
  openWishlist() {
    this.miniWishlistOpen.next(true);
  }
  closeWishlist() {
    this.miniWishlistOpen.next(false);
  }
}
