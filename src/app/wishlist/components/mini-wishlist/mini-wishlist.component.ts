import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { WishlistService } from '../../services/wishlist.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-mini-wishlist',
  standalone: false,
  templateUrl: './mini-wishlist.component.html',
  styleUrl: './mini-wishlist.component.css',
})
export class MiniWishlistComponent {
  @Input() isOpen!: boolean;
  wishlist: Product[] = [];
  constructor(
    private wishlistService: WishlistService,
    private sweetAlert: SweetAlertService,
  ) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe({
      next: (list) => {
        this.wishlist = list;
      },
      error: (error) => {
        this.sweetAlert.error('Error', error.message || 'Something went wrong');
      },
    });
  }
  close() {
    this.wishlistService.closeWishlist();
  }
  removeFromWishlist(itemId: number) {
    this.wishlistService.removeFromWishlist(itemId);
  }
}
