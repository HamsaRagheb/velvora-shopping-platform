import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UpdatePassword } from '../../../models/user';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-section',
  standalone: false,
  templateUrl: './password-section.component.html',
  styleUrl: './password-section.component.css',
})
export class PasswordSectionComponent {
  updatePassword: UpdatePassword = {
    currentPassword: '',
    password: '',
    rePassword: '',
  };
  @Output() sectionChange = new EventEmitter<string>();
  constructor(
    private authService: AuthService,
    private sweetAlert: SweetAlertService,
    private route: Router,
  ) {}

  updatedPassword() {
    this.authService.updatePassword(this.updatePassword).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.sweetAlert
            .success(
              'Password Updated',
              'Your password has been updated successfully',
            )
            .then(() => {
              this.sectionChange.emit('profile');
            });
        }
      },
      error: (err) => {
        this.sweetAlert.error(
          'Password Update Failed',
          'User recently changed password! Please login again.',
        );
      },
    });
  }
  onForgotPassword(): void {
    this.route.navigate(['/auth/forget-password']);
  }
}
