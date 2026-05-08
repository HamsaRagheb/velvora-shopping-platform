import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { PageBannerComponent } from './components/page-banner/page-banner.component';
import { WelcomeModelComponent } from './components/welcome-model/welcome-model.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    SearchComponent,
    ProductComponent,
    CategoriesComponent,
    FooterComponent,
    ScrollToTopComponent,
    PageBannerComponent,
    WelcomeModelComponent,
  ],
  imports: [CommonModule, AppRoutingModule, RouterModule, FormsModule],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    ProductComponent,
    FooterComponent,
    ScrollToTopComponent,
    PageBannerComponent,
    WelcomeModelComponent,
  ],
})
export class SharedModule {}
