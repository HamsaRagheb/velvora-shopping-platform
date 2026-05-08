import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CartComponent, MiniCartComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MiniCartComponent, CartComponent],
})
export class CartsModule {}
