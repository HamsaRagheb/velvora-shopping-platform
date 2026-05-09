import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../products/services/products.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { CartService } from '../../../carts/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();

  constructor(
    private productService: ProductsService,
    private wishlistService: WishlistService,
    private cartService: CartService,
  ) {}
  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.cartService.openCart();
    this.addToCartEvent.emit(this.product);
  }
  stars(rate: number) {
    return this.productService.getStars(rate);
  }
  toggleWishlist(product: Product) {
    this.wishlistService.toggle(product);
  }
  isWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}
