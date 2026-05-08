import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { LoggedUser } from '../../../models/user';

@Component({
  selector: 'app-profile-section',
  standalone: false,
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.css',
})
export class ProfileSectionComponent {
  loggedUser: LoggedUser | null = null;
  initials: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.initials = this.getInitials(this.loggedUser?.name);
  }

  private getInitials(name: string | undefined): string {
    if (!name) return '';
    return name
      .split('')
      .map((word) => word[0])
      .join('')
      .slice(0, 2);
  }
}
