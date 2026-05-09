import {
  Component,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-code-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-code-section.component.html',
  styleUrl: './reset-code-section.component.css',
})
export class ResetCodeSectionComponent implements OnInit {
  // Can still receive email from a parent via @Input if available
  @Input() email: string = '';

  // ── 6 individual digit inputs ─────────────────────────────────────────────
  @ViewChildren('digitInput') digitInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  // ── Form model ────────────────────────────────────────────────────────────
  digits: string[] = ['', '', '', '', '', ''];
  newPassword: string = '';
  confirmPassword: string = '';

  // ── UI state ──────────────────────────────────────────────────────────────
  isVerifying: boolean = false;
  isResetting: boolean = false;
  codeVerified: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private sweetAlert: SweetAlertService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // If email wasn't passed via @Input, fall back to sessionStorage
    if (!this.email) {
      this.email = sessionStorage.getItem('resetEmail') ?? '';
    }
  }

  // ── Computed helpers ──────────────────────────────────────────────────────

  get resetCode(): string {
    return this.digits.join('');
  }

  // ── Digit-input keyboard/paste navigation ─────────────────────────────────

  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.digits[index] = value.slice(-1);
    input.value = this.digits[index];

    if (this.digits[index] && index < 5) {
      this.digitInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onDigitKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      this.digitInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onDigitPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted =
      event.clipboardData?.getData('text').replace(/\D/g, '') ?? '';
    pasted
      .split('')
      .slice(0, 6)
      .forEach((char, i) => {
        this.digits[i] = char;
      });
    const lastIndex = Math.min(pasted.length, 5);
    this.digitInputs.toArray()[lastIndex].nativeElement.focus();
  }

  // ── Step 1: Verify reset code ─────────────────────────────────────────────

  onVerifyCode(): void {
    if (this.resetCode.length !== 6) return;

    this.isVerifying = true;
    this.authService.verifyResetCode({ resetCode: this.resetCode }).subscribe({
      next: (res) => {
        this.isVerifying = false;
        if (res.status === 'Success') {
          this.codeVerified = true;
          this.sweetAlert.success(
            'Code Verified!',
            'Now set your new password.',
          );
        }
      },
      error: (err) => {
        this.isVerifying = false;
        const message =
          err?.error?.message ?? 'Reset code is invalid or has expired.';
        this.sweetAlert.error('Invalid Code', message);
      },
    });
  }

  // ── Step 2: Reset password ────────────────────────────────────────────────

  onResetPassword(): void {
    this.isResetting = true;
    this.authService
      .resetPassword({ email: this.email, newPassword: this.newPassword })
      .subscribe({
        next: () => {
          this.isResetting = false;
          sessionStorage.removeItem('resetEmail');

          this.authService.logout(); //clears the new token the API just saved

          this.sweetAlert
            .success(
              'Password Reset!',
              'You can now sign in with your new password.',
            )
            .then(() => this.router.navigate(['/auth/login']));
        },
        error: (err) => {
          this.isResetting = false;
          const message =
            err?.error?.message ?? 'Something went wrong. Please try again.';
          this.sweetAlert.error('Reset Failed', message);
        },
      });
  }

  // ── Resend code ───────────────────────────────────────────────────────────

  onResendCode(): void {
    this.authService.forgotPassword({ email: this.email }).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.digits = ['', '', '', '', '', ''];
          this.codeVerified = false;
          this.sweetAlert.success('Code Resent!', res.message);
        }
      },
      error: () => {
        this.sweetAlert.error(
          'Failed',
          'Could not resend the code. Please try again.',
        );
      },
    });
  }
}
