import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { WishlistService } from '../../services/wishlist.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  wishlist: Product[] = [];
  constructor(
    private wishlistService: WishlistService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe({
      next: (list) => {
        this.wishlist = list;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  toProducts() {
    this.router.navigate(['/products']);
  }
}
