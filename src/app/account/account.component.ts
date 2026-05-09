import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { environment } from '../../environments/environment.development';

type Section = 'profile' | 'password';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  imgBase = environment.imgBase;
  activeSection: Section = 'profile';

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get loggedUser() {
    return this.authService.getLoggedUser();
  }

  setActiveSection(section: string): void {
    if (section === 'password' && !this.isLoggedIn) return;
    this.activeSection = section as Section;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
