import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-model',
  standalone: false,
  templateUrl: './welcome-model.component.html',
  styleUrl: './welcome-model.component.css',
})
export class WelcomeModelComponent {
  @Input() isVisable!: boolean;
  isClosing = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflowY = 'hidden';
    }
  }
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflowY = 'auto';
    }
  }

  close() {
    this.isClosing = true;

    setTimeout(() => {
      this.isVisable = false;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflowY = 'auto';
      }
    }, 500);
  }

  goToProducts() {
    this.isClosing = true;

    setTimeout(() => {
      this.isVisable = false;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflowY = 'auto';
      }
      this.router.navigate(['/products']);
    }, 500);
  }
}
