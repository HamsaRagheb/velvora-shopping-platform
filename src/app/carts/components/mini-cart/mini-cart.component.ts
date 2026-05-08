import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-cart',
  standalone: false,
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.css',
})
export class MiniCartComponent {
  cartItems: CartItem[] = [];
  @Input() isOpen!: boolean;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }
  deleteCartItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }
  decreaseItemQuantity(itemId: number) {
    this.cartService.decreaseQuantity(itemId);
  }
  increaseItemQuantity(itemId: number) {
    this.cartService.increaseQuantity(itemId);
  }
  itemstotalPrice(): number {
    return this.cartService.totalPrice();
  }
  closeMiniCart() {
    this.cartService.closeCart();
  }
  goToCart() {
    this.router.navigate(['/cart']);
    this.closeMiniCart();
  }
}
