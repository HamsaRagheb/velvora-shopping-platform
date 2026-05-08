import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
      this.totalPrice = this.cartService.totalPrice();
    });
  }

  increase(itemId: number) {
    this.cartService.increaseQuantity(itemId);
  }
  decrease(itemId: number) {
    this.cartService.decreaseQuantity(itemId);
  }
  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }
  clearCartItems() {
    this.cartService.clearCart();
  }
  toProducts() {
    this.router.navigate(['/products']);
  }
}
