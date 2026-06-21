import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../products/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchResults: Product[] = [];
  searchQuery: string = '';

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.productsService.getFilteredProducts().subscribe((results) => {
      this.searchResults = results;
    });

    this.route.queryParams.subscribe((params) => {
      const query = params['query'];
      this.searchQuery = query ?? '';
      if (query) {
        this.productsService.updateSearch(query);
      }
    });
  }
}
