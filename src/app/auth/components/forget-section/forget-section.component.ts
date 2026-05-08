import { Component, Output, EventEmitter } from '@angular/core';

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
  // Emits the verified email up to AccountComponent on success
  @Output() codeSent = new EventEmitter<string>();

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
          this.sweetAlert.success('Code Sent!', res.message).then(() => {
            // Save email to sessionStorage so ResetCodeSectionComponent can read it
            sessionStorage.setItem('resetEmail', this.email);

            // Hand the email up — AccountComponent will save it and switch to 'code' tab
            this.codeSent.emit(this.email);
            this.router.navigate(['/auth/account/reset-password']);
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
