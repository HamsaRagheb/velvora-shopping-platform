import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountComponent } from '../account/account.component';
import { ResetCodeSectionComponent } from './components/reset-code-section/reset-code-section.component';
import { ForgetSectionComponent } from './components/forget-section/forget-section.component';
import { ProfileSectionComponent } from '../account/components/profile-section/profile-section.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
