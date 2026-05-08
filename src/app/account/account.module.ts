import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ProfileSectionComponent } from './components/profile-section/profile-section.component';
import { PasswordSectionComponent } from './components/password-section/password-section.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileSectionComponent,
    PasswordSectionComponent,
  ],
  imports: [CommonModule, FormsModule, AccountRoutingModule, RouterModule],
})
export class AccountModule {}
