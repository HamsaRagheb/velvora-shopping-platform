import { Component } from '@angular/core';

import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forget-section.component.html',
  styleUrl: './forget-section.component.css',
})
export class ForgetSectionComponent {
  email: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private sweetAlert: SweetAlertService,
    private router: Router,
  ) {}

  onForgetPassword(): void {
    this.isLoading = true;

    this.authService.forgotPassword({ email: this.email }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.statusMsg === 'success') {
          // Save to sessionStorage FIRST before anything else
          sessionStorage.setItem('resetEmail', this.email);

          // Show alert then navigate
          this.sweetAlert.success('Code Sent!', res.message).then(() => {
            this.router.navigate(['/auth/reset-password']);
          });
        }
      },
      error: () => {
        this.isLoading = false;
        this.sweetAlert.error(
          'Failed',
          `No user is registered with the email address: ${this.email}`,
        );
      },
    });
  }
}
