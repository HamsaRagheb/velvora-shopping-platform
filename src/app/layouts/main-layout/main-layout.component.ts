import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../carts/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../wishlist/services/wishlist.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  isCartOpen!: boolean;
  isWishlistOpen!: boolean;
  isLoading: boolean = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.cartService.cartOpen$.subscribe((state) => {
      this.isCartOpen = state;
      this.toggleBodyScroll(this.isCartOpen);
    });

    this.wishlistService.miniWishlistOpen$.subscribe((state) => {
      this.isWishlistOpen = state;
      this.toggleBodyScroll(this.isWishlistOpen);
    });

    this.loadingService.loading$.subscribe((state) => {
      this.isLoading = state;
    });
  }

  toggleBodyScroll(state: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      if (state) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }
  }

  onOverlayClick() {
    if (this.isCartOpen) {
      this.cartService.closeCart();
    }
    if (this.isWishlistOpen) {
      this.wishlistService.closeWishlist();
    }
  }
}
