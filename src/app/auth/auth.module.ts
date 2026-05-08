import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { ForgetSectionComponent } from './components/forget-section/forget-section.component';
import { ResetCodeSectionComponent } from './components/reset-code-section/reset-code-section.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  exports: [LoginComponent, SignUpComponent],
})
export class AuthModule {}
