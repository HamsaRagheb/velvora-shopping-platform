# Velvora

A modern and scalable E-Commerce web application built with Angular.

Velvora delivers a smooth online shopping experience with modern frontend architecture, responsive UI design, authentication system, route protection, lazy loading, SSR support, and reusable Angular modules.

🔗 **Live Demo:** [Velvora](https://hamsaragheb.github.io/velvora-shopping-platform/products)

---

# Preview

Velvora is designed with a clean and modern shopping interface focused on performance, scalability, and user experience.

---

# Features

## Authentication System
- Login
- Signup
- Forgot Password
- Reset Password
- Logout

## Route Guards
- `authGuard`
  - Protects authenticated routes
- `userGuard`
  - Prevents logged-in users from accessing authentication pages

## Product Features
- Product Listing
- Product Details
- Product Search
- Categories

## Shopping Features
- Shopping Cart
- Wishlist
- Mini Cart
- Mini Wishlist

## Account Management
- Profile Section
- Change Password
- Sidebar Navigation

## Angular Features
- Lazy Loading
- Functional Route Guards
- HTTP Interceptors
- Shared Module Architecture
- Modular Architecture
- Angular SSR Support
- Standalone Component Lazy Loading
- Reusable Components

## UI/UX Features
- Responsive Design
- SweetAlert2 Notifications
- Loading Spinner
- Scroll To Top Button
- Clean Modern UI

---

# Technologies Used
- Angular
- TypeScript
- RxJS
- Angular Router
- Angular SSR
- Bootstrap
- HTML5
- CSS3
- SweetAlert2
- Fake Store API

---

# Project Structure

```bash
src/app
│
├── account/
│   ├── components/
│   │   ├── password-section/
│   │   └── profile-section/
│   ├── account.module.ts
│   └── account-routing.module.ts
│
├── auth/
│   ├── components/
│   │   ├── forget-section/
│   │   ├── login/
│   │   ├── reset-code-section/
│   │   └── sign-up/
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── user.guard.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── auth.module.ts
│   └── auth-routing.module.ts
│
├── carts/
│   ├── components/
│   │   ├── cart/
│   │   └── mini-cart/
│   ├── services/
│   │   └── cart.service.ts
│   └── carts.module.ts
│
├── interceptors/
│   └── error-interceptor.interceptor.ts
│
├── layouts/
│   ├── auth-layout/
│   └── main-layout/
│
├── models/
│   ├── cart-item.ts
│   ├── product.ts
│   └── user.ts
│
├── products/
│   ├── components/
│   │   ├── all-products/
│   │   └── products-details/
│   ├── services/
│   │   └── products.service.ts
│   └── products.module.ts
│
├── services/
│   ├── sweet-alert.service.ts
│   └── (additional global services)
│
├── shared/
│   ├── components/
│   │   ├── categories/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── page-banner/
│   │   ├── product/
│   │   ├── scroll-to-top/
│   │   ├── search/
│   │   ├── select/
│   │   ├── spinner/
│   │   └── welcome-model/
│   ├── services/
│   │   ├── loading.service.ts
│   │   └── share.service.ts
│   └── shared.module.ts
│
├── wishlist/
│   ├── components/
│   ├── services/
│   └── wishlist.module.ts
│
├── app.component.ts
├── app.module.ts
├── app.module.server.ts
├── app-routing.module.ts
└── app.routes.server.ts
```

---

# Lazy Loading

Velvora uses Angular Lazy Loading to improve application performance and reduce the initial bundle size.

## Implemented Lazy Loading
- Auth Module
- Account Module
- Carts Module
- Products Module
- Wishlist Module
- Standalone Components using `loadComponent`

---

# Route Guards

## authGuard
Protects private routes and redirects unauthorized users to the login page.

```ts
canActivate: [authGuard]
```

## userGuard
Prevents authenticated users from accessing authentication pages.

```ts
canActivate: [userGuard]
```

---

# SSR Support

The project supports Angular Server Side Rendering (SSR) for:
- Better SEO
- Faster page rendering
- Improved performance

---

# Error Handling

A global HTTP interceptor handles API errors and displays user-friendly notifications using SweetAlert2.

Handled Errors:
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 500 Server Error
- Network Errors

---

# Installation

Clone the repository:
```bash
git clone https://github.com/your-username/velvora-ecommerce.git
```

Navigate to the project folder:
```bash
cd velvora-ecommerce
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
ng serve
```

Open:
```txt
http://localhost:4200
```

---

# Build Project

```bash
ng build
```

---

# Future Improvements
- Online Payment Integration
- Order History
- Admin Dashboard
- Product Reviews
- Dark Mode
- NgRx State Management
- Product Recommendations

---

# Author

## Hamsa Ragheb
Frontend Developer specialized in Angular applications and scalable frontend architecture.

LinkedIn:
(https://www.linkedin.com/in/hamsa-ragheb/)

---

# License

This project is created for portfolio, educational, and learning purposes.
