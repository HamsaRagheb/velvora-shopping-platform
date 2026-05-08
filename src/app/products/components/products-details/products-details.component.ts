import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../../carts/services/cart.service';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-products-details',
  standalone: false,
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
  product!: Product;
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    const paramId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (paramId) {
      this.productService.getProductById(paramId).subscribe({
        next: (pro) => {
          this.product = pro;
        },
        error: (error) => {
          this.sweetAlertService.error(
            'opppsss',
            error.message || 'Something went wrong',
          );
        },
      });
    }
  }

  stars(rate: number) {
    return this.productService.getStars(rate);
  }

  increase(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartService.openCart();
  }
}
