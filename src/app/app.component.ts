import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from './carts/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from './wishlist/services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {}
