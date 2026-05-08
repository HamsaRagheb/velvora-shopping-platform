import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  @Input() categories: string[] = [];
  @Input() isOpen: boolean = false;
  @Output() closePanel = new EventEmitter<void>();

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.router.navigate(['/products'], {
      queryParams: { category },
    });
    this.close();
  }

  selectAll() {
    this.router.navigate(['/products'], {
      queryParams: { category: 'all' },
    });
    this.close();
  }

  close() {
    this.closePanel.emit();
  }
}
