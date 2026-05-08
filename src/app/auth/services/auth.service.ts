import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import {
  AuthResponse,
  LoggedUser,
  SignInUser,
  SignUpUser,
  UpdatePassword,
  ForgotPassword,
  ForgotPasswordResponse,
  ResetCode,
  VerifyResetCodeResponse,
  ResetPassword,
  ResetPasswordResponse,
} from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly Base_Url = 'https://ecommerce.routemisr.com/api/v1/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  // ── SSR-safe helpers ───────────────────────────────────────────────────────

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('userToken', token);
    }
  }

  private getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('userToken') : null;
  }

  private saveUser(user: LoggedUser): void {
    if (this.isBrowser()) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
    }
  }

  getLoggedUser(): LoggedUser | null {
    if (this.isBrowser()) {
      const user = localStorage.getItem('loggedUser');
      return user ? (JSON.parse(user) as LoggedUser) : null;
    }
    return null;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ token: this.getToken() ?? '' });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ── Auth APIs ──────────────────────────────────────────────────────────────

  // POST /auth/signup
  signUp(signUpUser: SignUpUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.Base_Url}/signup`, signUpUser)
      .pipe(
        tap((res) => {
          if (res.token) this.saveToken(res.token);
          if (res.user) this.saveUser(res.user);
        }),
      );
  }

  // POST /auth/signin
  signIn(signInUser: SignInUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.Base_Url}/signin`, signInUser)
      .pipe(
        tap((res) => {
          if (res.token) this.saveToken(res.token);
          if (res.user) this.saveUser(res.user);
        }),
      );
  }

  // POST /auth/forgotPasswords
  // 200 → { statusMsg: "success", message: "Reset code sent to your email" }
  forgotPassword(email: ForgotPassword): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.Base_Url}/forgotPasswords`,
      email,
    );
  }

  // POST /auth/verifyResetCode
  // 200 → { status: "Success" }
  // 400 → { statusMsg: "fail", message: "Reset code is invalid or has expired" }
  // ⚠️ Fixed: API expects { resetCode } — NOT { code }
  verifyResetCode(payload: ResetCode): Observable<VerifyResetCodeResponse> {
    return this.http.post<VerifyResetCodeResponse>(
      `${this.Base_Url}/verifyResetCode`,
      payload,
    );
  }

  // PUT /auth/resetPassword
  // 200 → { token: "..." }  (auto-saved)
  // 400 → { statusMsg: "fail", message: "reset code not verified" }
  // ⚠️ Must call verifyResetCode() successfully before this.
  resetPassword(
    resetPassword: ResetPassword,
  ): Observable<ResetPasswordResponse> {
    return this.http
      .put<ResetPasswordResponse>(
        `${this.Base_Url}/resetPassword`,
        resetPassword,
      )
      .pipe(
        tap((res) => {
          if (res.token) this.saveToken(res.token);
        }),
      );
  }

  // PUT /users/changeMyPassword
  updatePassword(updatePassword: UpdatePassword): Observable<AuthResponse> {
    return this.http
      .put<AuthResponse>(
        'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
        updatePassword,
        { headers: this.getAuthHeaders() },
      )
      .pipe(
        tap((res) => {
          if (res.token) this.saveToken(res.token);
        }),
      );
  }

  // GET /auth/verifyToken
  verifyToken(): Observable<{ message: string; decoded: any }> {
    return this.http.get<{ message: string; decoded: any }>(
      `${this.Base_Url}/verifyToken`,
      { headers: this.getAuthHeaders() },
    );
  }

  // ── Logout ─────────────────────────────────────────────────────────────────

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('loggedUser');
    }
  }
}
