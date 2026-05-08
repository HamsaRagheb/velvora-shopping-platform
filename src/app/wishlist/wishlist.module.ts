import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MiniWishlistComponent } from './components/mini-wishlist/mini-wishlist.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [WishlistComponent, MiniWishlistComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [WishlistComponent, MiniWishlistComponent],
})
export class WishlistModule {}
