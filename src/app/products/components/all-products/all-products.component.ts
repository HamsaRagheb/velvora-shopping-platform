import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../carts/services/cart.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-all-products',
  standalone: false,
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  products: Product[] = [];
  categories: string[] = [];
  cart: Product[] = [];
  showWelcomeModel: boolean = false;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.getCategories();

    this.activatedRoute.queryParams.subscribe((params) => {
      const category = params['category'];

      if (category && category !== 'all') {
        this.getProductsByCategory(category);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.loadingService.show();
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.loadingService.hide();
        this.triggerWelcomeModel();
      },
      error: () => {
        this.loadingService.hide();
      },
    });
  }

  getCategories() {
    this.productsService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }

  getProductsByCategory(category: string) {
    this.loadingService.show();
    this.productsService.getProductsByCategory(category).subscribe({
      next: (response) => {
        this.products = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
    });
  }

  triggerWelcomeModel() {
    setTimeout(() => {
      this.showWelcomeModel = true;
    }, 2000);
  }

  onCategoryChange(category: string) {
    if (category === 'all') {
      this.getProducts();
    } else {
      this.getProductsByCategory(category);
    }
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartService.openCart();
  }
}
