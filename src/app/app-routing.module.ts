import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SearchComponent } from './shared/components/search/search.component';
import { WishlistComponent } from './wishlist/components/wishlist/wishlist.component';
import { authGuard } from './auth/guards/auth.guard';
import { userGuard } from './auth/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'products', component: AllProductsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'details/:id', component: ProductsDetailsComponent },
      { path: 'details', component: ProductsDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
    ],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [userGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'auth/forget-password',
    loadComponent: () =>
      import('./auth/components/forget-section/forget-section.component').then(
        (m) => m.ForgetSectionComponent,
      ),
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./auth/components/reset-code-section/reset-code-section.component').then(
        (m) => m.ResetCodeSectionComponent,
      ),
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
