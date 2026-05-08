import { Component, HostListener } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { Router } from '@angular/router';
import { CartService } from '../../../carts/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { Product } from '../../../models/product';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  openMiniCategories: boolean = false;
  mobileSearchOpen: boolean = false;
  categories: string[] = [];
  products: Product[] = [];
  cartItemsNumber: number = 0;
  wishlistItemsNumber: number = 0;
  languages = [
    { name: 'English', flag: 'us' },
    { name: 'Español', flag: 'es' },
    { name: '简体中文', flag: 'cn' },
    { name: 'Italiano', flag: 'it' },
  ];
  countries = [
    { name: 'Australia', currency: 'PKR Rs' },
    { name: 'Austria', currency: 'PKR Rs' },
    { name: 'Egypt', currency: 'EGP' },
    { name: 'Belgium', currency: 'PKR Rs' },
    { name: 'Germany', currency: 'PKR Rs' },
    { name: 'Italy', currency: 'PKR Rs' },
    { name: 'Netherlands', currency: 'PKR Rs' },
    { name: 'Norway', currency: 'PKR Rs' },
    { name: 'Pakistan', currency: 'PKR Rs' },
    { name: 'Poland', currency: 'PKR Rs' },
    { name: 'Portugal', currency: 'PKR Rs' },
    { name: 'Spain', currency: 'PKR Rs' },
    { name: 'United Kingdom', currency: 'PKR Rs' },
    { name: 'United States', currency: 'PKR Rs' },
  ];
  searchQuery: string = '';
  searchResults: Product[] = [];
  showDropdown: boolean = false;

  selectedLang = this.languages[0];
  selectedCountry = this.countries[0];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}
  ngOnInit() {
    this.getCategories();
    this.cartService.cart$.subscribe((cart) => {
      this.cartItemsNumber = cart.length;
    });
    this.wishlistService.wishlist$.subscribe((wishlist) => {
      this.wishlistItemsNumber = wishlist.length;
    });
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.productsService.setProducts(res);
      },
    });
    this.productsService.getFilteredProducts().subscribe((results) => {
      this.searchResults = results;
      this.showDropdown = this.searchQuery.trim().length > 0;
    });
  }

  selectLang(lang: any) {
    this.selectedLang = lang;
  }
  selectCountry(country: any) {
    this.selectedCountry = country;
  }
  getCategories() {
    this.productsService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }
  onCategoryChange(category: string) {
    this.router.navigate(['/products'], {
      queryParams: { category },
    });
  }
  onSearchKeyUp(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;

    if (query.trim() === '') {
      this.showDropdown = false;
    }

    this.productsService.updateSearch(query);
  }

  navigateToSearchPage() {
    if (this.searchQuery.trim() === '') return;
    this.showDropdown = false;
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchQuery },
    });
    this.searchQuery = '';
  }
  onProductSelect() {
    this.showDropdown = false;
    this.searchQuery = '';
  }
  openCategories() {
    this.openMiniCategories = true;
  }

  toggleMobileSearch() {
    this.mobileSearchOpen = !this.mobileSearchOpen;
    if (!this.mobileSearchOpen) {
      this.showDropdown = false;
      this.searchQuery = '';
    }
  }
}
