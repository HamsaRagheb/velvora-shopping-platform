import { Component } from '@angular/core';
import { SignInUser } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signInUser: SignInUser = {
    email: '',
    password: '',
  };
  constructor(
    private authService: AuthService,
    private sweetAlert: SweetAlertService,
    private router: Router,
  ) {}
  onSignIn() {
    this.authService.signIn(this.signInUser).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.sweetAlert
            .success('Welcome back', 'You have successfully logged in.')
            .then(() => {
              this.router.navigate(['/products']);
            });
        }
      },
      error: (err) => {
        this.sweetAlert.error(
          'Oops! Login failed',
          'The email or password you entered is incorrect.',
        );
      },
    });
  }
  // activeTab: string = 'signup'; // default

  // setTab(tab: string) {
  //   this.activeTab = tab;
  // }
}
