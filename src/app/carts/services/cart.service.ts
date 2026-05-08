import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  private cartBehaviorSubject = new BehaviorSubject<CartItem[]>(this.getCart());
  cart$ = this.cartBehaviorSubject.asObservable();

  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const cart = this.getCart();
      this.cartBehaviorSubject.next(cart);
    }
  }

  getCart(): CartItem[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }

    return [];
  }

  updateCart(cart: CartItem[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    this.cartBehaviorSubject.next(cart);
  }

  addToCart(product: Product) {
    const cart = this.getCart();
    const existItem = cart.find((item) => item.id === product.id);

    if (existItem) {
      existItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.updateCart(cart);
  }

  removeFromCart(productId: number) {
    const cart = this.getCart();

    const updatedCart = cart.filter((item) => item.id !== productId);
    this.updateCart(updatedCart);
  }

  increaseQuantity(productId: number) {
    const cart = this.getCart();

    const item = cart.find((p) => p.id === productId);

    if (item) {
      item.quantity++;
      this.updateCart(cart);
    }
  }
  decreaseQuantity(productId: number) {
    const cart = this.getCart();

    const item = cart.find((p) => p.id === productId);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart(cart);
      } else {
        this.removeFromCart(productId);
      }
    }
  }
  totalPrice(): number {
    const cart = this.getCart();
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  }
  openCart() {
    this.cartOpen.next(true);
  }
  closeCart() {
    this.cartOpen.next(false);
  }
  clearCart() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }
    this.cartBehaviorSubject.next([]);
  }
}
