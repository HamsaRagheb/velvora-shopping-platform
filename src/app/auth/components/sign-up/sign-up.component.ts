import { Component } from '@angular/core';
import { SignUpUser } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpUser: SignUpUser = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  };
  constructor(
    private authService: AuthService,
    private sweetAlert: SweetAlertService,
    private router: Router,
  ) {}

  onSignUp() {
    this.authService.signUp(this.signUpUser).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.sweetAlert
            .success(
              'Account Created Successfully',
              `Welcome ${res.user?.name}`,
            )
            .then(() => {
              this.router.navigate(['/auth/login']);
            });
        }
      },
      error: (err) => {
        this.sweetAlert.error('SignUp Failed', 'User already exists');
      },
    });
  }

  // activeTab: string = 'signup'; // default
  // setTab(tab: string) {
  //   this.activeTab = tab;
  // }
}
